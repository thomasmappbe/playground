// Copyright 2006-2015 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the GPLv2 license, a copy of which can
// be found in the LICENSE file.

/**
    Las Venturas Playground v2.94.0 - Rock Hotel Jump

    This map was created by eF.Pedro - https://forum.sa-mp.nl/showthread.php?tid=27060
    
    Added by Jay on 29th June 2011 for 2.94 A2

**/

#define MAP3 3


map_create(MAP3)
{

    map_set_id(MAP3);
    
    map_set_name("LV Air");
    
    map_set_spawn(1723.8776,-1128.6116,2818.1299,276.0259);
    
    map_set_checkpoint(2559.0708,1016.7853,83.4936);
    
    map_set_max_players(10);
    
    map_add_race_checkpoint(1775.8694,-1125.0394,2817.8359); // /jump26
    map_add_race_checkpoint(2127.8823,-1105.3513,2644.6602); // cp
    map_add_race_checkpoint(2702.0210,-1070.2150,2056.0769); // cp
    map_add_race_checkpoint(2989.6770,-1052.3474,1800.4719); // cp
    map_add_race_checkpoint(3134.0847,-862.9904,1784.4065); // cp
    map_add_race_checkpoint(3215.0750,430.7708,698.5813); // cp
    map_add_race_checkpoint(2779.0005,818.3498,133.0696); // cp
    map_add_race_checkpoint(2616.5520,964.5906,83.9795); // cp
    
    map_add_vehicle(411,1734.05761719,-1120.94238281,2817.92993164,189.99755859,-1,-1,15);
    map_add_vehicle(541,1714.46984863,-1136.08544922,2817.82983398,0.00000000,-1,-1,15);
    map_add_vehicle(560,1725.99755859,-1122.04858398,2817.93481445,186.00000000,-1,-1,15);
    map_add_vehicle(451,1719.72412109,-1122.95190430,2817.89428711,180.00000000,-1,-1,15);
    map_add_vehicle(542,1729.86840820,-1134.25854492,2817.97338867,0.00000000,-1,-1,15);
    map_add_vehicle(444,1722.92041016,-1134.55249023,2818.87988281,0.00000000,-1,-1,15);
    map_add_vehicle(481,1713.53442383,-1129.39440918,2817.73876953,280.00000000,-1,-1,15);

    map_add_object(18822,2675.65209961,910.78552246,44.51851654,0.00000000,288.00000000,318.00000000);
    map_add_object(18822,2710.35205078,879.53820801,48.06851959,0.00000000,243.24975586,317.99932861);
    map_add_object(18809,2738.57373047,854.91296387,79.63693237,0.00000000,42.75000000,319.75000000);
    map_add_object(18809,2764.37451172,833.05944824,116.18692780,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,2789.97387695,811.39807129,152.44700623,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,3159.48022461,498.75759888,605.11114502,0.00000000,299.99987793,319.99993896);
    map_add_object(18809,2815.55712891,789.75256348,188.67207336,0.00000000,42.75000000,319.75000000);
    map_add_object(18809,2840.95898438,768.24786377,224.67207336,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,2866.26391602,746.84069824,260.49188232,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,2891.72558594,725.25762939,296.57681274,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,2917.48120117,703.44793701,333.07681274,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,2943.32250977,681.57427979,369.72695923,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,2969.08959961,659.74688721,406.24703979,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,2994.77416992,638.02246094,442.62200928,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,3020.36401367,616.32617188,478.90179443,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,3046.18383789,594.44683838,515.51196289,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,3071.98974609,572.59411621,552.07202148,0.00000000,42.74780273,319.74609375);
    map_add_object(18809,3097.58227539,550.91796875,588.35217285,0.00000000,42.74780273,319.74609375);
    map_add_object(18824,3125.23559570,527.59069824,616.53479004,0.00000000,74.50000000,319.99996948);
    map_add_object(18809,3192.74414062,470.83145142,589.61114502,0.00000000,278.74822998,320.00000000);
    map_add_object(18824,3233.11181641,448.56796265,592.10937500,44.65560913,304.78173828,147.59002686);
    map_add_object(18824,3253.70019531,465.04718018,622.15948486,39.23880005,13.27777100,175.75067139);
    map_add_object(18824,3228.02465820,477.62741089,653.80963135,39.23654175,346.71319580,312.48291016);
    map_add_object(18809,3216.14624023,449.27133179,687.88159180,0.00000000,228.74517822,266.24877930);
    map_add_object(18809,3133.50000000,-836.67578125,1791.31506348,0.00000000,278.74511719,268.99475098);
    map_add_object(18809,3213.73559570,412.43646240,720.25170898,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3211.39062500,376.57391357,751.77178955,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3209.03588867,340.44244385,783.57208252,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3206.69750977,304.81988525,814.88214111,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3204.27587891,267.56091309,847.63214111,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3201.87646484,231.47840881,879.38214111,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3199.50463867,195.40736389,911.13214111,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3197.06518555,158.25054932,943.79711914,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3194.66137695,121.55121613,976.07214355,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3192.26953125,84.96621704,1008.23223877,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3189.91967773,48.88013077,1039.98217773,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3187.47509766,11.96001720,1072.43359375,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3185.01806641,-25.33419991,1105.18359375,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3182.63452148,-61.81832123,1137.26257324,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3182.63378906,-61.81738281,1137.26257324,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3180.26586914,-98.21398926,1169.26257324,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3177.90185547,-134.33674622,1201.01257324,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3175.62451172,-169.30101013,1231.76257324,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3173.16455078,-206.42062378,1264.41320801,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3170.73876953,-242.99658203,1296.59704590,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3168.34936523,-279.37866211,1328.59704590,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3165.90380859,-316.39685059,1361.17175293,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3163.51635742,-352.73321533,1393.16186523,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3161.17602539,-388.31646729,1424.46484375,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3158.90039062,-423.52499390,1455.43981934,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3156.51782227,-459.92456055,1487.43981934,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3154.08740234,-496.86700439,1519.93981934,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3151.67211914,-533.79589844,1552.41503906,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3149.31030273,-569.85485840,1584.12353516,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3146.88769531,-606.86370850,1616.67553711,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3144.48364258,-643.55603027,1648.92553711,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3142.08544922,-680.24841309,1681.20532227,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3139.67382812,-716.87500000,1713.43054199,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3137.28149414,-753.24749756,1745.43054199,0.00000000,228.74084473,266.24816895);
    map_add_object(18809,3134.96826172,-788.68884277,1776.68054199,0.00000000,228.74084473,266.24816895);
    map_add_object(8171,3133.09594727,-923.30401611,1783.70043945,0.00000000,0.00000000,179.25000000);
    map_add_object(8171,3160.07006836,-923.65466309,1795.14990234,0.00000000,46.00000000,179.24743652);
    map_add_object(8171,3106.07861328,-922.86077881,1795.14990234,0.00000000,45.99975586,359.24743652);
    map_add_object(18822,3125.68115234,-1011.68695068,1791.89050293,287.34887695,304.36187744,97.86511230);
    map_add_object(18822,3092.63378906,-1042.33142090,1801.19055176,289.64794922,60.40991211,172.41003418);
    map_add_object(18809,3044.70410156,-1049.16821289,1804.43835449,0.00000000,270.00000000,181.49475098);
    map_add_object(8171,2952.76025391,-1054.88769531,1799.76647949,0.00000000,0.00000000,273.24743652);
    map_add_object(8171,2951.79858398,-1038.97497559,1815.43615723,0.00000000,90.00000000,273.24658203);
    map_add_object(8171,2953.44628906,-1070.86096191,1815.43615723,0.00000000,90.00000000,93.24645996);
    map_add_object(8171,2859.85009766,-1060.25769043,1838.13562012,306.50000000,0.00000000,273.49645996);
    map_add_object(8171,2777.99047852,-1065.26623535,1949.00207520,306.49658203,0.00000000,273.49365234);
    map_add_object(8171,2697.09472656,-1070.21826172,2058.58911133,306.49658203,0.00000000,273.49365234);
    map_add_object(8171,2616.37939453,-1075.15185547,2167.91259766,306.49658203,0.00000000,273.49365234);
    map_add_object(8171,2534.44140625,-1080.17370605,2278.89697266,306.49658203,0.00000000,273.49365234);
    map_add_object(8171,2445.48242188,-1085.03588867,2377.61059570,318.49658203,0.00000000,273.49365234);
    map_add_object(8171,2342.51293945,-1091.32287598,2468.90380859,318.49365234,0.00000000,273.48815918);
    map_add_object(8171,2239.42944336,-1097.62304688,2560.32763672,318.49365234,0.00000000,273.48815918);
    map_add_object(8171,2138.17993164,-1103.48388672,2637.45043945,328.49365234,0.00000000,273.48815918);
    map_add_object(8171,2021.38586426,-1110.62304688,2709.17749023,328.49121094,0.00000000,273.48815918);
    map_add_object(8171,1905.06225586,-1117.72753906,2780.61865234,328.49121094,0.00000000,273.48815918);
    map_add_object(8171,1777.77343750,-1125.30175781,2817.12988281,0.00000000,0.00000000,273.48815918);
    map_add_object(8171,1776.04968262,-1096.61865234,2826.44042969,0.00000000,36.00000000,273.48815918);
    map_add_object(8171,1779.48022461,-1154.04565430,2826.44042969,0.00000000,35.99670410,93.48815918);
    map_add_object(3624,1724.11022949,-1128.98950195,2821.78540039,0.00000000,0.00000000,184.00000000);
    map_add_object(3800,1711.04028320,-1117.99230957,2818.37304688,0.00000000,0.00000000,0.00000000);
    map_add_object(3800,1712.23535156,-1117.88452148,2818.37304688,0.00000000,0.00000000,0.00000000);
    map_add_object(3800,1711.04003906,-1117.99218750,2819.37304688,0.00000000,0.00000000,0.00000000);
    map_add_object(3800,1712.16064453,-1117.89135742,2819.37304688,0.00000000,0.00000000,0.00000000);
    map_add_object(3800,1713.86132812,-1141.65600586,2818.31005859,0.00000000,0.00000000,0.00000000);
    map_add_object(3800,1712.78747559,-1141.68823242,2818.31005859,0.00000000,0.00000000,0.00000000);
    map_add_object(3800,1712.78710938,-1141.68750000,2819.31005859,0.00000000,0.00000000,0.00000000);
    map_add_object(3800,1713.83593750,-1141.65527344,2819.31005859,0.00000000,0.00000000,0.00000000);
    map_add_object(1736,1737.32800293,-1128.50244141,2822.51391602,0.00000000,0.00000000,275.75000000);
    return 1;
}
