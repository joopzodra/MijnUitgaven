const entriesCsv = `entryId;date;amount;payment_method;description;categoryId
1;20150530;-85.14;BEA;Haan ALMERE;4
2;20150530;-28.09;BEA;T Zuivelhoekje WAGENINGE;2
3;20150530;-13.25;BEA;Thedinghsweert Zorg KERK;2
4;20150530;-3.7;BEA;Thedinghsweert Zorg KERK;2
5;20150530;-9;BEA;Vish. A. Rosendaal VEENE;2
6;20150530;-25;BEA;WILLEMS AGF OPHEUSDEN;2
7;20150601;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
8;20150601;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543217;4
9;20150604;-6.5;BEA;CCV*TOKO CHINA ARNHEM AR;2
10;20150604;-23.5;BEA;Lazuur FoodCommunity WAG;2
11;20150604;-184;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
12;20150605;-7.68;BEA;Blokker124Wageningen WAG;2
13;20150605;-37.5;BEA;Chutney Express WAGENING;15
14;20150605;-18.25;BEA;Columbus WAGENINGEN;2
15;20150605;-25;BEA;HEMA Wageningen WAGENING;2
16;20150605;-7.6;BEA;HEMA Wageningen WAGENING;2
17;20150605;-43;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219876;1
18;20150605;-520;overboeking;IBAN: NL29RABO0144691426        BIC: RABONL2U                    Naam: Houtmix                   Omschrijving: fact.nr. 11111;5
19;20150606;-41.09;BEA;ALBERT HEIJN 1103 WAGENI;2
20;20150606;-35;BEA;CCV*KWEKERIJ DEPENDENS B;16
21;20150606;-12.81;BEA;Lazuur FoodCommunity WAG;2
22;20150606;-11.68;BEA;T Zuivelhoekje WAGENINGE;2
23;20150606;-6.75;BEA;Welkoop WAGENINGEN;16
24;20150606;-22.35;BEA;ZAM ZAM Wageningen WAGEN;2
25;20150606;-50;GEA;ING WAGENINGEN;2
26;20150611;-13.06;BEA;Lazuur FoodCommunity WAG;2
27;20150611;-93.61;BEA;Tango Tiel TIEL;4
28;20150611;-237.38;overboeking;IBAN: NL05ABNA0539905089        BIC: ABNANL2A                    Naam: J VAN DE BLAAK ZN BV      Omschrijving: fact.nr.201500000  deb.nr.00000;1
29;20150612;-4.95;BEA;AH to go Bijlmer5833 AMS;15
30;20150612;-4.7;BEA;Lazuur FoodCommunity WAG;2
31;20150612;-5;BEA;P&R Transferium P1 4 AMS;4
32;20150612;-1;BEA;P1 ArenA AMSTERDAM ZUI;4
33;20150612;-5.5;BEA;TOKO MIN WAGENINGEN;2
34;20150613;-2.65;BEA;Stolk BV WAGENINGEN;2
35;20150613;-13.55;BEA;Thedinghsweert Zorg KERK;2
36;20150613;-70;GEA;ING WAGENINGEN;2
37;20150615;-4.8;BEA;HEMA Wageningen WAGENING;2
38;20150615;-3;BEA;HEMA Wageningen WAGENING;2
39;20150615;-4.65;BEA;TOKO MIN WAGENINGEN;2
40;20150617;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
41;20150617;-19.39;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456795;13
42;20150620;-83.59;BEA;ALBERT HEIJN 1103 WAGENI;2
43;20150620;-17.6;BEA;ZAM ZAM Wageningen WAGEN;2
44;20150622;-119.91;iDEAL;IBAN: NL63ABNA0598143912        BIC: ABNANL2A                    Naam: WEHKAMP FINANCE BV        Omschrijving: 12345678765 Vooruitbetaling Wehkamp       Kenmerk: 22-06-2015 14:14 12345678765;5
45;20150625;-6.7;BEA;TOKO MIN WAGENINGEN;2
46;20150625;-83.47;BEA;Total Middelburg MIDDELB;4
47;20150625;-16.25;doorlopende machtiging;Incassant: NL75ZZZ170783930000  Naam: DELA NATURA- EN LEVENSVE   Machtiging: 00000987654     Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 986789           IBAN: NL09RABO0303577010        Kenmerk: DELA-201678901234;12
48;20150625;-25.46;doorlopende machtiging;Incassant: NL75ZZZ170783930000  Naam: DELA NATURA- EN LEVENSVE   Machtiging: 00000987654     Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 986789           IBAN: NL09RABO0303577010        Kenmerk: DELA-201678901234;12
49;20150626;-150;GEA;RABOBANK VALLEI EN RIJ;2
50;20150626;-126;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157976;1
51;20150629;-769.61;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 06-2015               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI CJ;1
52;20150629;-59;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445597;4
53;20150630;-59.95;iDEAL;IBAN: NL51ABNA0565668625        BIC: ABNANL2A                    Naam: STG ADYEN                 Omschrijving: 12345678765 Bedankt voor uw bestelling 000965FonqNL          Kenmerk: 30-06-2015 15:49 12345678765;5
54;20150701;-5.38;BEA;1067 action WAGENINGEN;2
55;20150701;-37.74;BEA;Lazuur FoodCommunity WAG;2
56;20150701;-11.4;BEA;TOKO MIN WAGENINGEN;2
57;20150701;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
58;20150701;-184;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
59;20150703;-8.89;BEA;Lazuur FoodCommunity WAG;2
60;20150703;-10.8;BEA;ZAM ZAM Wageningen WAGEN;2
61;20150703;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543218;4
62;20150704;-34.7;BEA;ALBERT HEIJN 1103 WAGENI;2
63;20150704;-18.25;BEA;Columbus WAGENINGEN;2
64;20150706;-4.89;BEA;520 Hoogvliet 07 WAGENIN;2
65;20150706;-43;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219877;1
66;20150706;-56.1;doorlopende machtiging;Incassant: NL30ZZZ333034790000  Naam: ZIGGO SERVICES BV          Machtiging: 00000987675                      Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: 09867890987;14
67;20150708;-13.39;BEA;Lazuur FoodCommunity WAG;2
68;20150709;-30.02;BEA;ESSO 't Loo WEZEP;4
69;20150709;-136.89;doorlopende machtiging;Incassant: NL57ZZZ506958160000  Naam: VITENS NV                  Machtiging: 00000        Omschrijving: Factuurnr 222333444555666 VNKlantnr 99988877766545666 BTW 1.93         IBAN: NL94INGB0000869000        Kenmerk: 00999999888887;1
70;20150710;-4.99;BEA;Blokker124Wageningen WAG;2
71;20150710;-73.19;BEA;TINQ BENNEKOM, DREESLA B;4
72;20150711;-30;GEA;RABOBANK VALLEI EN RIJ;2
73;20150713;-63.5;Acceptgiro;IBAN: NL75INGB0000259600        BIC: INGBNL2A                    Naam: VPRO                      Betalingskenm.: 0987654321;18
74;20150715;-36.44;BEA;ALBERT HEIJN 1103 WAGENI;2
75;20150716;-8.54;BEA;520 Hoogvliet 04 WAGENIN;2
76;20150717;-9.99;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456794;13
77;20150718;-18.19;BEA;Lazuur FoodCommunity WAG;2
78;20150718;-5.5;BEA;TOKO MIN WAGENINGEN;2
79;20150718;-7;BEA;Windkorenmolen Vlijt WAG;2
80;20150718;-24.05;BEA;ZAM ZAM Wageningen WAGEN;2
81;20150719;-87.32;BEA;Haan Almere ALMERE;4
82;20150720;-11.5;BEA;HEMA Wageningen WAGENING;2
83;20150720;-19.8;BEA;T Zuivelhoekje WAGENINGE;2
84;20150722;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
85;20150722;-7.25;BEA;Lazuur FoodCommunity WAG;2
86;20150722;-2;BEA;Lazuur FoodCommunity WAG;2
87;20150724;-2.6;BEA;HEMA Wageningen WAGENING;2
88;20150724;-17.24;BEA;Lazuur FoodCommunity WAG;2
89;20150724;-13.68;BEA;T Zuivelhoekje WAGENINGE;2
90;20150724;-126;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157965;1
91;20150727;-25.71;BEA;ALBERT HEIJN 1103 WAGENI;2
92;20150727;-41.86;doorlopende machtiging;Incassant: NL07ZZZ082053570000  Naam: GBLT                       Machtiging: 12345678            Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804617;1
93;20150727;-58;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445588;4
94;20150728;-9.5;BEA;CCV*WILLYSWARENHUIS NA W;5
95;20150728;-12.19;BEA;Lazuur FoodCommunity WAG;2
96;20150729;-4.2;BEA;1067 action WAGENINGEN;2
97;20150729;-9.75;BEA;HEMA Wageningen WAGENING;2
98;20150730;-769.61;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 07-2015               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI  CJ;1
99;20150801;-3.99;BEA;520 Hoogvliet 06 WAGENIN;2
100;20150801;-51.94;BEA;ALBERT HEIJN 1103 WAGENI;2
101;20150801;-24.95;BEA;CCV*RAVEN BAGS LUGGAGE W;18
102;20150802;-110;BEA;LE POMMIER RUSTIQUE SP D;10
103;20150802;-23;BEA;LE POMMIER RUSTIQUE SP D;10
104;20150803;-17.66;BEA;SPAR DINANT DINANT;2
105;20150803;-250;GEA;Fortis bank DINANT;10
106;20150803;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
107;20150803;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543219;4
108;20150804;-21.35;BEA;CREA SCRIBE NAMUR;18
109;20150805;-17.67;BEA;NEMERLIN LUDIVINE YVOIR ;10
110;20150805;-184;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
111;20150806;-29.78;BEA;AU PANIER DE VICTOR SP Y;5
112;20150808;-62.81;BEA;CADO N 1 HUY;3
113;20150810;-3.46;BEA;Lazuur FoodCommunity WAG;2
114;20150810;-4.4;BEA;TOKO MIN WAGENINGEN;2
115;20150811;-12.95;BEA;La Colombe boekh. ARNHEM;13
116;20150813;-10.58;BEA;520 Hoogvliet 02 WAGENIN;2
117;20150813;-33.75;BEA;HEMA Wageningen WAGENING;2
118;20150813;-31.49;BEA;Lazuur FoodCommunity WAG;2
119;20150815;-4.28;BEA;Lazuur FoodCommunity WAG;2
120;20150816;-19.85;iDEAL;IBAN: NL35RABO0117713678        BIC: RABONL2U                    Naam: Stichting Pay.nl          Omschrijving: 12345678765 De Koffiethuiswinkel                       Kenmerk: 16-08-2015 12:51 12345678765;18
121;20150817;-9.99;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456790;13
122;20150818;-6.95;BEA;520 HOOGVLIET 70 WAGENIN;2
123;20150819;-32.45;BEA;ALBERT HEIJN 1103 WAGENI;2
124;20150819;-9.98;BEA;Lazuur FoodCommunity WAG;2
125;20150819;-7.85;BEA;ZAM ZAM Wageningen WAGEN;2
126;20150820;-15.69;BEA;Lazuur FoodCommunity WAG;2
127;20150820;-123.01;doorlopende machtiging;Incassant: NL57ZZZ506958160000  Naam: VITENS NV                  Machtiging: 00000        Omschrijving: Factuurnr 222333444555666 VNKlantnr 99988877766545666 BTW 1.93         IBAN: NL94INGB0000869000        Kenmerk: 00999999888887;1
128;20150821;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
129;20150822;-9.95;BEA;Profile Peerenboom WAGEN;18
130;20150822;-23.55;BEA;ZAM ZAM Wageningen WAGEN;2
131;20150822;-20;GEA;RABOBANK VALLEI EN RIJ;2
132;20150823;-4.99;BEA;520 Hoogvliet 01 WAGENIN;2
133;20150823;-27.78;BEA;520 Hoogvliet 02 WAGENIN;2
134;20150825;-10.18;BEA;Welkoop WAGENINGEN;16
135;20150825;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157966;1
136;20150826;-30.97;BEA;ALBERT HEIJN 1103 WAGENI;2
137;20150826;-18.25;BEA;Columbus WAGENINGEN;2
138;20150826;-41.86;doorlopende machtiging;Incassant: NL07ZZZ082053570000  Naam: GBLT                       Machtiging: 12345678            Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804615;1
139;20150827;-79.95;BEA;TINQ WAGENINGEN NUDE WAG;4
140;20150827;-59;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445595;4
141;20150827;-998.25;overboeking;IBAN: NL83TRIO0390238759        BIC: TRIONL2U                    Naam: Meubelmakerij Marang      Omschrijving: rekening 000445;5
142;20150828;-769.61;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 08-2015               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI CJ;1
143;20150829;-10.36;BEA;Keijzer & Van Santen WAG;2
144;20150901;-38.67;BEA;ALBERT HEIJN 1103 WAGENI;2
145;20150901;-7.19;BEA;Lazuur FoodCommunity WAG;2
146;20150901;-23.6;BEA;ZAM ZAM Wageningen WAGEN;2
147;20150901;-107.9;iDEAL;IBAN: NL64RABO0376807334        BIC: RABONL2U                    Naam: VZR Trading B.V.          Omschrijving: 12345678765 Bestelling Zonweringstunter zonweringstunter.nl             Kenmerk: 01-09-2015 10:02 12345678765;5
148;20150901;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
149;20150901;-184;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
150;20150901;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543220;4
151;20150905;-20;GEA;RABOBANK VALLEI EN RIJ;2
152;20150906;-12.57;BEA;520 Hoogvliet 06 WAGENIN;2
153;20150907;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219878;1
154;20150908;-19;BEA;HEMA Wageningen WAGENING;2
155;20150908;-4.35;BEA;HEMA Wageningen WAGENING;2
156;20150909;-7.4;BEA;1067 action WAGENINGEN;2
157;20150910;-7.5;BEA;HEMA Wageningen WAGENING;2
158;20150910;-8.4;BEA;Windkorenmolen Vlijt WAG;2
159;20150912;-22;BEA;HEMA Wageningen WAGENING;2
160;20150912;-59.13;BEA;Lazuur FoodCommunity WAG;2
161;20150912;-6.7;BEA;Thedinghsweert Zorg KERK;2
162;20150912;-81.4;BEA;TINQ WAGENINGEN NUDE WAG;4
163;20150912;-10.8;BEA;TOKO MIN WAGENINGEN;2
164;20150915;-6.95;BEA;Profile Peerenboom WAGEN;18
165;20150916;-26.3;BEA;Lazuur FoodCommunity WAG;2
166;20150917;-93.19;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456800;13
167;20150919;-16.7;BEA;ALBERT HEIJN 1103 WAGENI;2
168;20150919;-20.58;BEA;Lazuur FoodCommunity WAG;2
169;20150919;-11.24;BEA;T Zuivelhoekje WAGENINGE;2
170;20150919;-3.95;BEA;Windkorenmolen Vlijt WAG;2
171;20150924;-32.65;BEA;ALBERT HEIJN 1103 WAGENI;2
172;20150924;-78.46;BEA;Lazuur FoodCommunity WAG;2
173;20150925;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
174;20150925;-41.86;doorlopende machtiging;Incassant: NL07ZZZ082053570000  Naam: GBLT                       Machtiging: 12345678            Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804620;1
175;20150925;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157967;1
176;20150925;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157968;1
177;20150926;-21.2;BEA;Columbus WAGENINGEN;2
178;20150926;-10;BEA;KWIK FIT CENTER 352 WAGE;4
179;20150926;-75.86;BEA;TINQ BENNEKOM - DREESL B;4
180;20150928;-59;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445598;4
181;20150928;-16.25;doorlopende machtiging;Incassant: NL75ZZZ170783930000  Naam: DELA NATURA- EN LEVENSVE   Machtiging: 00000987654     Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 986789           IBAN: NL09RABO0303577010        Kenmerk: DELA-201678901234;12
182;20150928;-25.46;doorlopende machtiging;Incassant: NL75ZZZ170783930000  Naam: DELA NATURA- EN LEVENSVE   Machtiging: 00000987654     Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 986789           IBAN: NL09RABO0303577010        Kenmerk: DELA-201678901234;12
183;20150929;-12.95;BEA;ANWB VKPT0080 MIDDELBURG;3
184;20150929;-4.2;BEA;Gemeente Middelburg MIDD;4
185;20150929;-2.3;BEA;Gemeente Middelburg MIDD;4
186;20150929;-5.7;BEA;PRIMERA BURGER MIDDELBUR;18
187;20150929;-769.61;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 09-2015               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI  CJ;1
188;20150930;-73.93;overboeking;IBAN: NL91INGB0692710981        BIC: INGBNL2A                    Naam: Van den Dikkenberg - van de Kraats                         Omschrijving: factuurnr. 15000222;6
189;20151001;-24.7;BEA;Lazuur FoodCommunity WAG;2
190;20151001;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
191;20151001;-184;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
192;20151001;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543221;4
193;20151002;-22;BEA;HEMA Wageningen WAGENING;2
194;20151003;-4.49;BEA;520 Hoogvliet 07 WAGENIN;2
195;20151004;-78.41;BEA;Tango Bennekom BENNEKOM ;4
196;20151006;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219879;1
197;20151007;-25.55;BEA;Lazuur FoodCommunity WAG;2
198;20151007;-79.25;BEA;Sauna de Veluwe 'S-GRAVE;10
199;20151007;-8.85;BEA;TOKO MIN WAGENINGEN;2
200;20151008;-26;BEA;HEMA Wageningen WAGENING;2
201;20151008;-56.1;doorlopende machtiging;Incassant: NL30ZZZ333034790000  Naam: ZIGGO SERVICES BV          Machtiging: 00000987675                      Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: 09867890987;14
202;20151009;-70.76;overboeking;IBAN: NL92RABO0100961819        BIC: RABONL2U                    Naam: Rothuizen-Krol            Omschrijving: yyyy/xxxx;1
203;20151010;-25;BEA;Firma P. van Dijk VEENEN;5
204;20151010;-8.99;BEA;GULF VEENENDAAL SMALLE V;4
205;20151014;-33.37;BEA;520 Hoogvliet 02 WAGENIN;2
206;20151014;-7.87;BEA;Blokker124Wageningen WAG;2
207;20151014;-14;BEA;HEMA Wageningen WAGENING;2
208;20151014;-17.9;BEA;Kruiden Al Diwan WAGENIN;2
209;20151014;-13.36;BEA;Lazuur FoodCommunity WAG;2
210;20151014;-312.45;BEA;Thuisin van Dijk VEENEND;5
211;20151015;-22;BEA;HEMA Wageningen WAGENING;2
212;20151015;-250;GEA;RABOBANK VALLEI EN RIJ;2
213;20151016;-190;GEA;RABOBANK VALLEI EN RIJ;2
214;20151016;-1407.78;overboeking;IBAN: NL63RABO0355123002        BIC: RABONL2U                    Naam: Kraan schilders          Omschrijving: Fakt.nr. 11111;6
215;20151018;-21.54;BEA;Lazuur FoodCommunity WAG;2
216;20151019;-9.99;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456799;13
217;20151021;-10.19;BEA;AO Maastricht BV MAASTRI;2
218;20151021;-18.25;BEA;Columbus WAGENINGEN;2
219;20151022;-7.05;BEA;ZAM ZAM Wageningen WAGEN;2
220;20151024;-5.67;BEA;520 Hoogvliet 06 WAGENIN;2
221;20151024;-15.77;BEA;AO Almere BV ALMERE;2
222;20151024;-2.5;BEA;CCV*WILLYSWARENHUIS NA W;5
223;20151024;-36.5;BEA;Lazuur FoodCommunity WAG;2
224;20151024;-68.9;BEA;TINQ WAGENINGEN NUDE WAG;4
225;20151024;-14.45;BEA;TOKO MIN WAGENINGEN;2
226;20151024;-70;GEA;SNS BANK WAGENINGEN;2
227;20151026;-41.86;doorlopende machtiging;Incassant: NL07ZZZ082053570000  Naam: GBLT                       Machtiging: 12345678            Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804619;1
228;20151026;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157969;1
229;20151027;-24;BEA;HEMA Wageningen WAGENING;2
230;20151027;-58;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445589;4
231;20151029;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
232;20151029;-769.61;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 10-2015               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI  CJ;1
233;20151031;-291;BEA;Firma P. van Dijk VEENEN;5
234;20151102;-4.71;BEA;ALBERT HEIJN 1103 WAGENI;2
235;20151102;-22;BEA;HEMA Wageningen WAGENING;2
236;20151102;-5.29;BEA;Lazuur FoodCommunity WAG;2
237;20151102;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
238;20151102;-184;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
239;20151102;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543222;4
240;20151103;-142.8;overboeking;IBAN: NL25TRIO0390305278        BIC: TRIONL2U                    Naam: W. Bovendeert             Omschrijving: vleespakket;2
241;20151104;-4.82;BEA;520 Hoogvliet 03 WAGENIN;2
242;20151105;-0.79;BEA;520 Hoogvliet 07 WAGENIN;2
243;20151105;-82.75;BEA;Firezone Renkum RENKUM;4
244;20151105;-3.78;BEA;Ikea bv inz. Duiven DUIV;5
245;20151105;-35.89;BEA;Ikea Duiven DUIVEN;5
246;20151106;-5.88;BEA;1067 action WAGENINGEN;2
247;20151106;-18.5;BEA;CCV*NESPRESSO NEDERLAN A;2
248;20151106;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219880;1
249;20151107;-13.58;BEA;De Hoge Born WAGENINGEN ;2
250;20151113;-18.53;BEA;Lazuur FoodCommunity WAG;2
251;20151113;-8.44;BEA;T Zuivelhoekje WAGENINGE;2
252;20151114;-22;BEA;HEMA Wageningen WAGENING;2
253;20151114;-6.22;BEA;Kruidvat 7955 WAGENINGEN;2
254;20151115;-12.98;BEA;IKEA BV/AMERSFOORT AMERS;5
255;20151117;-9.99;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456798;13
256;20151118;-250;GEA;RABOBANK VALLEI EN RIJ;2
257;20151119;-250;GEA;RABOBANK VALLEI EN RIJ;2
258;20151120;-28.06;BEA;Lazuur FoodCommunity WAG;2
259;20151120;-250;GEA;RABOBANK VALLEI EN RIJ;2
260;20151121;-57.58;BEA;ALBERT HEIJN 1103 WAGENI;2
261;20151121;-6.78;BEA;GAMMA WAGENINGEN WAGENIN;5
262;20151121;-27.7;BEA;ZAM ZAM Wageningen WAGEN;2
263;20151123;-2.58;BEA;520 Hoogvliet 07 WAGENIN;2
264;20151123;-9.38;BEA;GAMMA WAGENINGEN WAGENIN;5
265;20151123;-34.79;iDEAL;IBAN: NL18RABO0117464112        BIC: RABONL2U                    Naam: Floorfriendly             Omschrijving: 11122233344455566 777888 ff2013-2139710 Floorfriendly                           Kenmerk: 23-11-2015 12:23 123454321;5
266;20151123;-20.9;iDEAL;IBAN: NL19DEUT0319821366        BIC: DEUTNL2N                    Naam: Stichting Derdengelden Buckaroo                            Omschrijving: knivesandtools.nl *44190 1A1 KATO Group BV               Kenmerk: 23-11-2015 12:45 1234509876;18
267;20151124;-27.94;BEA;GAMMA WAGENINGEN WAGENIN;5
268;20151125;-5.7;BEA;520 HOOGVLIET 70 WAGENIN;2
269;20151125;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157970;1
270;20151126;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
271;20151126;-41.86;doorlopende machtiging;Incassant: NL07ZZZ082053570000  Naam: GBLT                       Machtiging: 12345678            Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804618;1
272;20151127;-769.61;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 11-2015               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI  CJ;1
273;20151127;-59;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445596;4
274;20151128;-27.95;BEA;Columbus WAGENINGEN;2
275;20151128;-19.85;BEA;T Zuivelhoekje WAGENINGE;2
276;20151129;-4.61;BEA;520 Hoogvliet 06 WAGENIN;2
277;20151201;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
278;20151201;-184;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
279;20151201;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543223;4
280;20151203;-22;BEA;HEMA Wageningen WAGENING;2
281;20151203;-13.82;BEA;Lazuur FoodCommunity WAG;2
282;20151203;-8.65;BEA;ZAM ZAM Wageningen WAGEN;2
283;20151207;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219881;1
284;20151208;-11.38;BEA;520 Hoogvliet 03 WAGENIN;2
285;20151210;-79.66;BEA;TINQ WAGENINGEN NUDE WAG;4
286;20151212;-1.49;BEA;520 Hoogvliet 05 WAGENIN;2
287;20151212;-33.25;BEA;HEMA Wageningen WAGENING;2
288;20151212;-24.8;BEA;Lazuur FoodCommunity WAG;2
289;20151212;-20;GEA;ING WAGENINGEN;2
290;20151215;-7.51;BEA;Lazuur FoodCommunity WAG;2
291;20151217;-9.99;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456791;13
292;20151218;-10;doorlopende machtiging;Incassant: NL03ZZZ301243580000  Naam: NS GROEP IZ NS REIZIGERS   Machtiging: 12345678765        Omschrijving: Bestelling  INC. O V/NS-FIETS                      IBAN: NL40ABNA0537879099         Kenmerk: 12345678765           Voor: JAI CJ;4
293;20151219;-19;BEA;HEMA Wageningen WAGENING;2
294;20151220;-18.33;BEA;520 Hoogvliet 02 WAGENIN;2
295;20151221;-74.89;BEA;TINQ WAGENINGEN NUDE WAG;4
296;20151222;-540.76;Acceptgiro;IBAN: NL49RABO0347802664        BIC: RABONL2U                    Naam: Univï¿½ Dichtbij            Betalingskenm.: 1234567899;1
297;20151223;-4.88;BEA;1067 action WAGENINGEN;2
298;20151223;-38.97;BEA;Lazuur FoodCommunity WAG;2
299;20151223;-29.15;BEA;ZAM ZAM Wageningen WAGEN;2
300;20151224;-37;BEA;HEMA Wageningen WAGENING;2
301;20151224;-23.18;BEA;Lazuur FoodCommunity WAG;2
302;20151224;-25;BEA;T Zuivelhoekje WAGENINGE;2
303;20151224;-41.86;doorlopende machtiging;Incassant: NL07ZZZ082053570000  Naam: GBLT                       Machtiging: 12345678            Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804616;1
304;20151228;-59;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445593;4
305;20151228;-16.61;doorlopende machtiging;Incassant: NL75ZZZ170783930000  Naam: DELA NATURA- EN LEVENSVE   Machtiging: 00000987654     Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 986789           IBAN: NL09RABO0303577010        Kenmerk: DELA-201678901234;12
306;20151228;-26.01;doorlopende machtiging;Incassant: NL75ZZZ170783930000  Naam: DELA NATURA- EN LEVENSVE   Machtiging: 00000987654     Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 986789           IBAN: NL09RABO0303577010        Kenmerk: DELA-201678901234;12
307;20151228;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157971;1
308;20151229;-28.57;BEA;520 Hoogvliet 02 WAGENIN;2
309;20151229;-23.19;BEA;520 HOOGVLIET 80 WAGENIN;2
310;20151229;-22.05;BEA;Keijzer & Van Santen WAG;2
311;20151229;-31.92;BEA;Lazuur FoodCommunity WAG;2
312;20151229;-7.3;BEA;TOKO MIN WAGENINGEN;2
313;20151229;-56.1;doorlopende machtiging;Incassant: NL30ZZZ333034790000  Naam: ZIGGO SERVICES BV          Machtiging: 00000987675                      Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: 09867890987;14
314;20151229;-195.89;eenmalige machtiging;Incassant: NL37ZZZ331727090000  Naam: BSH Huishoudapparaten BV   Machtiging: NL1122334455    Omschrijving: /INV/99887766                        IBAN: NL19RBOS0416925766         Kenmerk: 10000012345;5
315;20151230;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
316;20151230;-18.25;BEA;Columbus WAGENINGEN;2
317;20151230;-769.61;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 12-2015               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI  CJ;1
318;20151231;-31.65;BEA;CCV*BAKKERIJ STROOP WAGE;2
319;20160104;-26.5;BEA;HEMA Wageningen WAGENING;2
320;20160104;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
321;20160104;-188.5;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
322;20160104;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543224;4
323;20160106;-14.04;BEA;Lazuur FoodCommunity WAG;2
324;20160106;-8.4;BEA;T Zuivelhoekje WAGENINGE;2
325;20160106;-5.9;BEA;TOKO MIN WAGENINGEN;2
326;20160107;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219882;1
327;20160107;-137.62;doorlopende machtiging;Incassant: NL57ZZZ506958160000  Naam: VITENS NV                  Machtiging: 00000        Omschrijving: Factuurnr 222333444555666 VNKlantnr 99988877766545666 BTW 1.93         IBAN: NL94INGB0000869000        Kenmerk: 00999999888887;1
328;20160112;-31.5;doorlopende machtiging;Incassant: NL73ZZZ290124040000  Naam: Goudse Schade12  N.V.                           Machtiging: 88888888                         Omschrijving: Kenmerk: 000009999999111111 Omschrijving: CompleetVerzekerd ref 444433332222;12
329;20160112;-2500;overboeking;IBAN: NL76ABNA0256115761        BIC: ABNANL2A                    Naam: Hypotheekbank          Omschrijving: gedeeltelijke aflo ssing hypotheekdeel 000 0000 11111;18
330;20160114;-15.5;BEA;520 Hoogvliet 01 WAGENIN;2
331;20160114;-2.95;BEA;Columbus WAGENINGEN;2
332;20160114;-5.42;BEA;Lazuur FoodCommunity WAG;2
333;20160114;-20.23;BEA;T Zuivelhoekje WAGENINGE;2
334;20160115;-24;BEA;HEMA Wageningen WAGENING;2
335;20160116;-6.1;BEA;Lazuur FoodCommunity WAG;2
336;20160118;-43.31;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
337;20160118;-9.99;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456793;13
338;20160120;-6.99;BEA;Blokker124Wageningen WAG;2
339;20160120;-13.75;BEA;HEMA Wageningen WAGENING;2
340;20160120;-19.36;BEA;Lazuur FoodCommunity WAG;2
341;20160120;-26.55;BEA;ZAM ZAM Wageningen WAGEN;2
342;20160120;-2800;overboeking;IBAN: NL76ABNA0256115761        BIC: ABNANL2A                    Naam: Hypotheekbank          Omschrijving: gedeeltelijke aflo ssing hypotheekdeel 000 0000 11112;18
343;20160124;-60.4;Acceptgiro;IBAN: NL88BNGH0285040448        BIC: BNGHNL2G                    Naam: Gemeente Wageningen       Betalingskenm.: 091100000000;1
344;20160125;-26.5;BEA;HEMA Wageningen WAGENING;2
345;20160125;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157972;1
346;20160126;-79.91;BEA;ESSO OVERMAAT ARNHEM;4
347;20160126;-13.49;BEA;Lazuur FoodCommunity WAG;2
348;20160126;-21.62;BEA;T Zuivelhoekje WAGENINGE;2
349;20160127;-58;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445594;4
350;20160128;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
351;20160128;-769.61;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 01-2016               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI  CJ;1
352;20160129;-5.75;BEA;TOKO MIN WAGENINGEN;2
353;20160130;-12;BEA;AdriaandeSmaakmaker MAAS;2
354;20160201;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
355;20160201;-188.5;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
356;20160201;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543225;4
357;20160201;-39.55;doorlopende machtiging;Incassant: NL89ZZZ370109920000  Naam: REAAL SCHADEVERZEKERING    Machtiging: M000        Omschrijving: Kenmerk  098760 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: 123456789;1
358;20160204;-17.23;BEA;Lazuur FoodCommunity WAG;2
359;20160204;-13.3;BEA;ZAM ZAM Wageningen WAGEN;2
360;20160204;-169.1;doorlopende machtiging;Incassant: NL35ZZZ370109920002  Naam: ROUTE MOBIEL               Machtiging: MANDAAT12345      Omschrijving: Je Route Mobiel pr emie met Factuurnummer 201600099988877766                        IBAN: NL95ABNA0644712163        Kenmerk: 20167788994455;4
361;20160205;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219883;1
362;20160206;-3.99;BEA;1067 action WAGENINGEN;2
363;20160206;-21.25;BEA;HEMA Wageningen WAGENING;2
364;20160208;-72.13;BEA;SHELL TEN ESSCHEN HEERLE;4
365;20160210;-4.66;BEA;Lazuur FoodCommunity WAG;2
366;20160210;-21.01;BEA;T Zuivelhoekje WAGENINGE;2
367;20160211;-339.42;iDEAL;IBAN: NL43RABO0134053281        BIC: RABONL2U                    Naam: CheapTickets              Omschrijving: 12345678765  www.CheapticketsNL                        Kenmerk: 11-02-2016 13:49 12345678765;10
368;20160211;-62.6;doorlopende machtiging;Incassant: NL03ZZZ301243580000  Naam: NS GROEP IZ NS REIZIGERS   Machtiging: 12345678765   Omschrijving: Bestelling  12345678765                         IBAN: NL40ABNA0537879099         Kenmerk: 12345678765             Voor: JAI CJ;4
369;20160213;-1.81;BEA;520 Hoogvliet 07 WAGENIN;2
370;20160213;-18.25;BEA;Columbus WAGENINGEN;2
371;20160213;-8;BEA;HEMA Wageningen WAGENING;2
372;20160213;-18.6;BEA;Lazuur FoodCommunity WAG;2
373;20160217;-9.99;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456792;13
374;20160219;-12;BEA;HEMA Wageningen WAGENING;2
375;20160219;-29.84;BEA;Lazuur FoodCommunity WAG;2
376;20160219;-20.64;BEA;T Zuivelhoekje WAGENINGE;2
377;20160219;-22.2;BEA;TOKO MIN WAGENINGEN;2
378;20160220;-3.37;BEA;520 Hoogvliet 07 WAGENIN;2
379;20160221;-25;BEA;NS-Ede-Wagening 201 EDE ;4
380;20160224;-64.55;BEA;TINQ WAGENINGEN NUDE WAG;4
381;20160225;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157973;1
382;20160226;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
383;20160226;-7.89;BEA;Lazuur FoodCommunity WAG;2
384;20160226;-14.95;BEA;theater van de bloem WAG;18
385;20160226;-725.07;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 02-2016               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI  CJ;1
386;20160229;-59;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445590;4
387;20160229;-39.55;doorlopende machtiging;Incassant: NL89ZZZ370109920000  Naam: REAAL SCHADEVERZEKERING    Machtiging: M000        Omschrijving: Kenmerk  098760 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: 123456790;1
388;20160301;-4.85;BEA;Lazuur FoodCommunity WAG;2
389;20160301;-10.28;BEA;T Zuivelhoekje WAGENINGE;2
390;20160301;-5.85;BEA;TOKO MIN WAGENINGEN;2
391;20160301;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
392;20160301;-188.5;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
393;20160301;-14.66;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543226;4
394;20160302;-13;overboeking;IBAN: NL83RBRB0691438692        BIC: RBRBNL21                    Naam: Mirjam Hessen            Omschrijving: Zand op mijn ziel;13
395;20160303;-2.95;BEA;Columbus WAGENINGEN;2
396;20160303;-8;BEA;HEMA Wageningen WAGENING;2
397;20160303;-42.06;BEA;Lazuur FoodCommunity WAG;2
398;20160303;-10.9;BEA;Windkorenmolen Vlijt WAG;2
399;20160303;-11.2;BEA;ZAM ZAM Wageningen WAGEN;2
400;20160305;-27;BEA;HEMA Wageningen WAGENING;2
401;20160306;-14.85;BEA;AO Rotterdam Centrum ROT;2
402;20160307;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219884;1
403;20160311;-26.69;BEA;Lazuur FoodCommunity WAG;2
404;20160312;-22.3;BEA;Lazuur FoodCommunity WAG;2
405;20160312;-80.19;BEA;Tango Maarsbergen MAARSB;4
406;20160312;-2.71;BEA;Windkorenmolen Vlijt WAG;2
407;20160312;-50;GEA;ING WAGENINGEN;2
408;20160313;-37.95;iDEAL;IBAN: NL30ABNA0524590958        BIC: ABNANL2A                    Naam: STG MOLLIE PAYMENTS       Omschrijving: 87685 47372837889 Graanmolen.com 002968marmelot                    Kenmerk: 13-03-2016 10:17 12345678765;18
409;20160316;-18.25;BEA;Columbus WAGENINGEN;2
410;20160316;-30.02;BEA;De Oude Tol WAGENINGEN;16
411;20160316;-24;BEA;HEMA Wageningen WAGENING;2
412;20160316;-3.5;BEA;HEMA Wageningen WAGENING;2
413;20160316;-15.02;BEA;Lazuur FoodCommunity WAG;2
414;20160317;-27.5;BEA;Boekhandel Kniphorst WAG;13
415;20160317;-202.71;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456797;10
416;20160319;-19.99;BEA;Blokker124Wageningen WAG;2
417;20160319;-5.85;BEA;GIJ-Wageningen WAGENINGE;18
418;20160319;-5;BEA;TOKO MIN WAGENINGEN;2
419;20160319;-21;BEA;ZAM ZAM Wageningen WAGEN;2
420;20160320;-8.44;BEA;Lazuur FoodCommunity WAG;2
421;20160321;-7.96;BEA;Welkoop WAGENINGEN;16
422;20160322;-34.65;BEA;Lazuur FoodCommunity WAG;2
423;20160322;-18.15;BEA;T Zuivelhoekje WAGENINGE;2
424;20160322;-351;Acceptgiro;IBAN: NL88BNGH0285040448        BIC: BNGHNL2G                    Naam: Gemeente Wageningen       Betalingskenm.: 000000000001;1
425;20160325;-5.88;BEA;1067 action WAGENINGEN;2
426;20160325;-0.89;BEA;520 Hoogvliet 07 WAGENIN;2
427;20160325;-12;BEA;HEMA Wageningen WAGENING;2
428;20160325;-32.97;BEA;Lazuur FoodCommunity WAG;2
429;20160326;-26.5;BEA;De Boschhoeve WOLFHEZE;16
430;20160326;-5.53;BEA;Lazuur FoodCommunity WAG;2
431;20160326;-23.99;BEA;Welkoop WAGENINGEN;16
432;20160326;-3.95;BEA;Windkorenmolen Vlijt WAG;2
433;20160328;-44.83;overboeking;IBAN: NL91INGB0692710981        BIC: INGBNL2A                    Naam: Van den Dikkenberg - van de Kraats b.v.                    Omschrijving: fact.nr. 16000222;6
434;20160329;-4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
435;20160329;-59;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445591;4
436;20160329;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157974;1
437;20160330;-8;BEA;HEMA Wageningen WAGENING;2
438;20160330;-36.25;BEA;Keijzer & Van Santen WAG;2
439;20160330;-10.02;BEA;Lazuur FoodCommunity WAG;2
440;20160330;-725.07;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 03-2016               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI CJ;1
441;20160330;-16.61;doorlopende machtiging;Incassant: NL75ZZZ170783930000  Naam: DELA NATURA- EN LEVENSVE   Machtiging: 00000987654     Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 986789           IBAN: NL09RABO0303577010        Kenmerk: DELA-201678901234;12
442;20160330;-26.01;doorlopende machtiging;Incassant: NL75ZZZ170783930000  Naam: DELA NATURA- EN LEVENSVE   Machtiging: 00000987654     Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 986789           IBAN: NL09RABO0303577010        Kenmerk: DELA-201678901234;12
443;20160331;-9;BEA;CCV*WILLYSWARENHUIS NA W;5
444;20160331;-250;GEA;ING WAGENINGEN;2
445;20160331;-39.55;doorlopende machtiging;Incassant: NL89ZZZ370109920000  Naam: REAAL SCHADEVERZEKERING    Machtiging: M000        Omschrijving: Kenmerk  098760 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: 123456791;1
446;20160401;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
447;20160401;-14.69;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543227;4
448;20160404;-2.7;BEA;520 Hoogvliet 06 WAGENIN;2
449;20160404;-18.7;doorlopende machtiging;Incassant: NL30ZZZ333034790000  Naam: ZIGGO SERVICES BV          Machtiging: 00000987675                      Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: 09867890987;14
450;20160405;-17.03;BEA;Lazuur FoodCommunity WAG;2
451;20160405;-74.59;BEA;Tango Bennekom BENNEKOM ;4
452;20160405;-188.5;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
453;20160406;-12;BEA;Parking de Loodsen AMSTE;4
454;20160406;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219885;1
455;20160406;-48.4;overboeking;IBAN: NL12RABO0192061585        BIC: RABONL2U                    Naam: HvD Autoservice                                Omschrijving: fact.nr. 000;4
456;20160407;-2.36;BEA;Lazuur FoodCommunity WAG;2
457;20160407;-10.65;BEA;T Zuivelhoekje WAGENINGE;2
458;20160407;-27.3;BEA;ZAM ZAM Wageningen WAGEN;2
459;20160407;-135.75;doorlopende machtiging;Incassant: NL57ZZZ506958160000  Naam: VITENS NV                  Machtiging: 00000        Omschrijving: Factuurnr 222333444555666 VNKlantnr 99988877766545666 BTW 1.93         IBAN: NL94INGB0000869000        Kenmerk: 00999999888887;1
460;20160408;-27;BEA;HEMA Wageningen WAGENING;2
461;20160412;-20.33;BEA;Lazuur FoodCommunity WAG;2
462;20160416;-27.2;BEA;Lazuur FoodCommunity WAG;2
463;20160418;-19.85;BEA;PA ECOBRENT LISBOA;10
464;20160418;-250;GEA;RABOBANK VALLEI EN RIJ;2
465;20160418;-9.99;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456789;13
466;20160420;-200;GEA;R de Cascais, 884 Malvei;10
467;20160425;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157975;1
468;20160426;-19.98;BEA;EL CORTE INGLES LISB LIS;3
469;20160426;-200;GEA;Gare do Oriente, Piso Li;10
470;20160427;-58;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445599;4
471;20160428;-725.07;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 04-2016               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI  CJ;1
472;20160429;-11.12;BEA;Lazuur FoodCommunity WAG;2
473;20160429;-9.81;BEA;T Zuivelhoekje WAGENINGE;2
474;20160429;-39.55;doorlopende machtiging;Incassant: NL89ZZZ370109920000  Naam: REAAL SCHADEVERZEKERING    Machtiging: M000        Omschrijving: Kenmerk  098760 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: 123456792;1
475;20160502;-4.5;BANK;ABN AMRO Bank N.V.               BetaalGemak E               3,15PB Betaalpas                0,75 PB Betaalpas                0,60;11
476;20160502;-16.51;BEA;520 Hoogvliet 07 WAGENIN;2
477;20160502;-49.99;iDEAL;IBAN: NL60RABO0396709478        BIC: RABONL2U                    Naam: Conrad Electronic Benelux BV                               Omschrijving: 12345678765 Conrad Elec tronic Benelux BV               Kenmerk: 02-05-2016 11:18 12345678765;18
478;20160502;-29.04;doorlopende machtiging;Incassant: NL00000  Naam: BNP PARIBAS CARDIF SCH     Machtiging: P00000.R01        Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xcvbnm;1
479;20160502;-13.93;doorlopende machtiging;Incassant: NL21ZZZ330520730000  Naam: OHRA SCHADE12   Machtiging: 00000000000  Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: DEB876543228;4
480;20160503;-4.99;BEA;520 Hoogvliet 01 WAGENIN;2
481;20160503;-18.7;doorlopende machtiging;Incassant: NL30ZZZ333034790000  Naam: ZIGGO SERVICES BV          Machtiging: 00000987675                      Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: 09867890987;14
482;20160504;-18.25;BEA;Columbus WAGENINGEN;2
483;20160504;-30;BEA;HEMA Wageningen WAGENING;2
484;20160504;-6.61;BEA;Keijzer & Van Santen WAG;2
485;20160504;-14.16;BEA;Lazuur FoodCommunity WAG;2
486;20160504;-10;BEA;TOKO MIN WAGENINGEN;2
487;20160506;-15.36;BEA;Lazuur FoodCommunity WAG;2
488;20160506;-188.5;doorlopende machtiging;Incassant: NL13ZZZ302086310000  Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxx       Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: yyyyy;12
489;20160506;-46;doorlopende machtiging;Incassant: NL15ZZZ243026850000  Naam: GREENCHOICE                Machtiging: 9999999              Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: 43219886;1
490;20160508;-76.34;BEA;Tango Bennekom BENNEKOM ;4
491;20160509;-7.5;BEA;HEMA Wageningen WAGENING;2
492;20160509;-6.08;BEA;Lazuur FoodCommunity WAG;2
493;20160509;-12.69;BEA;T Zuivelhoekje WAGENINGE;2
494;20160510;-21.94;BEA;Welkoop WAGENINGEN;16
495;20160511;-47.5;BEA;520 Hoogvliet 04 WAGENIN;2
496;20160511;-7.95;BEA;DE HAAN WAGENINGEN WAGEN;4
497;20160511;-6.13;BEA;Welkoop WAGENINGEN;16
498;20160514;-8.07;BEA;Lazuur FoodCommunity WAG;2
499;20160517;-121.71;doorlopende machtiging;Incassant: NL13ZZZ332005960000  Naam: INT CARD SERVICES          Machtiging: fghj9885674    Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 00009887             IBAN: NL23ABNA0818769483        Kenmerk: 123456796;10
500;20160518;-29.31;BEA;Lazuur FoodCommunity WAG;2
501;20160520;-1.56;BEA;520 Hoogvliet 07 WAGENIN;2
502;20160520;-28.5;BEA;HEMA Wageningen WAGENING;2
503;20160521;-6.47;BEA;520 Hoogvliet 03 WAGENIN;2
504;20160521;-8.75;BEA;ALBERT HEIJN 1103 WAGENI;2
505;20160521;-11.83;BEA;Lazuur FoodCommunity WAG;2
506;20160521;-12.91;BEA;T Zuivelhoekje WAGENINGE;2
507;20160521;-14;BEA;Welkoop WAGENINGEN;16
508;20160521;-20.05;BEA;ZAM ZAM Wageningen WAGEN;2
509;20160524;-3.99;BEA;1067 action WAGENINGEN;2
510;20160524;-9.13;BEA;T Zuivelhoekje WAGENINGE;2
511;20160525;-132;doorlopende machtiging;Incassant: NL76NLE999999990636  Naam: NLE                        Machtiging: 100000        Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157977;1
512;20160526;-4.5;BANK;ABN AMRO Bank N.V.               BetaalGemak E               3,15PB Betaalpas                0,75 PB Betaalpas                0,60;
513;20160527;-4.47;BEA;Lazuur FoodCommunity WAG;
514;20160527;-59;doorlopende machtiging;Incassant: NL35ZZZ273653230000  Naam: BELASTINGDIENST            Machtiging: 123455678           Omschrijving: 00-MM-99                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445592;
515;20160528;-18.5;BEA;HEMA Wageningen WAGENING;
516;20160528;-19.66;BEA;Lazuur FoodCommunity WAG;
517;20160528;-79.21;BEA;TINQ WAGENINGEN NUDE WAG;
518;20160528;-50;GEA;ING WAGENINGEN;
519;20160529;-25.18;overboeking;IBAN: NL92RABO0100961819        BIC: RABONL2U                    Naam: Cornelissen Rothuizen KrolOmschrijving: xxxx-yyyy;
520;20160530;-725.07;doorlopende machtiging;Incassant: NL05ZZZ302230030000  Naam: Hypotheekbank           Machtiging: xyzabcdezf Omschrijving: Verschuldigd bedra g PERIODE 05-2016               IBAN: NL76ABNA0256115761         Kenmerk: 0000081002022731       Voor: JAI CJ;
521;20160531;-39.55;doorlopende machtiging;Incassant: NL89ZZZ370109920000  Naam: REAAL SCHADEVERZEKERING    Machtiging: M000        Omschrijving: Kenmerk  098760 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: 123456793;`;

export { entriesCsv };