// Copyright 2016 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

// Tag to be used for regular player-visible announcements.
const AnnounceTag = 'announce';

// Tag to be used for private administrator-visible announcements.
const AdminTag = 'admin';

// Tag to be used for sending reports to admins on IRC.
const ReportTag = 'report';

// Implementation of the functionality of the Announce feature. This is where input will be verified
// and the messages will be dispatched to the appropriate audience.
class AnnounceManager {
    // Announces that the |name| has started. Players can join by typing |command|.
    announceMinigame(player, name, command) {
        const formattedMessage = Message.format(Message.ANNOUNCE_MINIGAME, name, command);

        server.playerManager.forEach(onlinePlayer =>
            onlinePlayer.sendMessage(formattedMessage));
    }

    // Announces that |player| has joined the minigame named |name|. Other players can type the
    // |command| themselves to participate in the minigame as well.
    announceMinigameParticipation(player, name, command) {
        const formattedMessage =
            Message.format(Message.ANNOUNCE_NEWS_MINIGAME_JOINED, player.name, name, command);

        // TODO(Russell): Validate that |formattedMessage| is safe for game text usage.

        // Announce it asynchronously when not running a test to avoid reentrancy problems.
        Promise.resolve().then(() => pawnInvoke('OnDisplayNewsMessage', 's', formattedMessage));

        this.announceToIRC(AnnounceTag, Message.format(Message.ANNOUNCE_MINIGAME_JOINED_IRC,
                                                       player.name, player.id, name));
    }

    // Announces |message| to all in-game players. Optionally |args| may be passed if the |message|
    // is an instance of the Message class, which is common infrastructure for user-visible text.
    announceToPlayers(message, ...args) {
        if (message instanceof Message)
            message = Message.format(message, ...args);

        const formattedMessage = Message.format(Message.ANNOUNCE_ALL, message);

        server.playerManager.forEach(player =>
            player.sendMessage(formattedMessage));

        this.announceToIRC(AnnounceTag, message);
    }

    // Announces |message| to all in-game administrators. Optionally |args| may be passed if
    // |message| is an instance of Message, which is common infrastructure for user-visible text.
    announceToAdministrators(message, ...args) {
        if (message instanceof Message)
            message = Message.format(message, ...args);

        const formattedMessage = Message.format(Message.ANNOUNCE_ADMINISTRATORS, message);

        server.playerManager.forEach(player => {
            if (!player.isAdministrator())
                return;

            player.sendMessage(formattedMessage);
        });

        this.announceToIRC(AdminTag, message);
    }

    // Announces that a |player| did a report of |reportedPlayer| because of |reason| to all in-game
    // administrators. It uses the ReportTag for the IRC-message.
    announceReportToAdministrators(player, reportedPlayer, reason) {
        const formattedMessage = Message.format(
            Message.ANNOUNCE_REPORT, player.name, player.id, reportedPlayer.name, reportedPlayer.id,
            reason);

        server.playerManager.forEach(player => {
            if (!player.isAdministrator())
                return;

            player.sendMessage(formattedMessage);
        });

        this.announceToIRC(
            ReportTag, player.name, player.id, reportedPlayer.name, reportedPlayer.id, reason);
    }

    // Announces |tag| with the given |parameters|, in order, to IRC. It is the responsibility for
    // bots to pick up on distribution and display of the message from thereon.
    announceToIRC(tag, ...parameters) {
        const message = '[' + tag + '] ' + parameters.join(' ');
        if (message.length > 400) {
            console.log('[AnnounceManager] Warning: Message dropped because it could cause an ' +
                        'overflow in the echo plugin: ' + message.substr(0, 125) + '...');
            return;
        }

        pawnInvoke('EchoMessage', 's', message);
    }
}

export default AnnounceManager;
