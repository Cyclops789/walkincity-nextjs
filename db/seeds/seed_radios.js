const { executeQuery, colors } = require("../db");
colors.enable()

const table = 'radios'

const query = `
INSERT INTO ${table} (id, name, url, created_on) VALUES
(2, '0_RADIO_NO_NAME', 'https://air5.amgradio.ru/RuWave48', '2023-07-10 15:20:33.616536'),
(3, '1_RADIO_NO_NAME', 'https://play.global.audio/nrj128', '2023-07-10 15:20:33.624729'),
(4, '2_RADIO_NO_NAME', 'https://radiosummernight.stream.laut.fm/radiosummernight?t302=2023-03-10_21-14-37&uuid=0e1bb9b7-2653-4b6c-99cf-95a2c5895f9b', '2023-07-10 15:20:33.629985'),
(5, '3_RADIO_NO_NAME', 'https://a1-it.newradio.it/stream', '2023-07-10 15:20:33.636911'),
(6, '4_RADIO_NO_NAME', 'https://srv1.streamradiowy.eu/radio90', '2023-07-10 15:20:33.645579'),
(7, '5_RADIO_NO_NAME', 'https://air4.amgradio.ru/HypeFM', '2023-07-10 15:20:33.651104'),
(8, '6_RADIO_NO_NAME', 'https://air4.amgradio.ru/Retro', '2023-07-10 15:20:33.658611'),
(9, '7_RADIO_NO_NAME', 'https://air7.amgradio.ru/Cafe', '2023-07-10 15:20:33.663161'),
(10, '8_RADIO_NO_NAME', 'https://stream.lolliradio.net/lolli_italia.mp3', '2023-07-10 15:20:33.667515'),
(11, '9_RADIO_NO_NAME', 'https://play.global.audio/radio1128', '2023-07-10 15:20:33.674116'),
(12, '10_RADIO_NO_NAME', 'https://air4.amgradio.ru/RemixFM', '2023-07-10 15:20:33.680425'),
(13, '11_RADIO_NO_NAME', 'https://mp3.amgradio.ru/RusRock', '2023-07-10 15:20:33.684658'),
(14, '12_RADIO_NO_NAME', 'https://ice01.fluidstream.net/birikina', '2023-07-10 15:20:33.691425'),
(15, '13_RADIO_NO_NAME', 'https://friesenradio.stream.laut.fm/friesenradio?t302=2023-03-10_21-15-37&uuid=50ab012c-e413-4277-a15b-a95fcd0533b6', '2023-07-10 15:20:33.695593'),
(16, '14_RADIO_NO_NAME', 'https://live.antenne.at/ak', '2023-07-10 15:20:33.700046'),
(17, '15_RADIO_NO_NAME', 'https://s7.yesstreaming.net:8040/stream', '2023-07-10 15:20:33.704403'),
(18, '16_RADIO_NO_NAME', 'https://radiosummernight.stream.laut.fm/radiosummernight?t302=2023-03-10_21-28-27&uuid=eb63ea3e-c284-4ca7-aec5-498dab62e4a8', '2023-07-10 15:20:33.708668'),
(19, '17_RADIO_NO_NAME', 'https://s2.stationplaylist.com:7094/listen.aac', '2023-07-10 15:20:33.713800'),
(20, '18_RADIO_NO_NAME', 'https://play.global.audio/nrjhi.aac', '2023-07-10 15:20:33.717887'),
(21, '19_RADIO_NO_NAME', 'https://1000hamburg.stream.laut.fm/1000hamburg?t302=2023-03-12_11-25-53&uuid=9eb5dcf6-862e-4f96-aef2-7d45eccef030', '2023-07-10 15:20:33.721827'),
(22, '20_RADIO_NO_NAME', 'https://nr12.newradio.it:8612/stream', '2023-07-10 15:20:33.726180'),
(23, '21_RADIO_NO_NAME', 'https://srv.giannivps.gq:8002/light_radio_aacp', '2023-07-10 15:20:33.730289'),
(24, '22_RADIO_NO_NAME', 'https://nl1.streamhosting.ch/lounge128.mp3', '2023-07-10 15:20:33.734637'),
(25, '23_RADIO_NO_NAME', 'https://live.hostingbudget.nl:4490/stream', '2023-07-10 15:20:33.738840'),
(26, '24_RADIO_NO_NAME', 'https://c2409ic1.fast-serv.com/stream', '2023-07-10 15:20:33.743731'),
(27, '25_RADIO_NO_NAME', 'https://srv.webradiomanager.fr:2140/stream', '2023-07-10 15:20:33.747823'),
(28, '26_RADIO_NO_NAME', 'https://ec2.yesstreaming.net:2560/stream', '2023-07-10 15:20:33.752169'),
(29, '27_RADIO_NO_NAME', 'https://srv.webradiomanager.fr:1740/stream', '2023-07-10 15:20:33.756442'),
(30, '28_RADIO_NO_NAME', 'https://radio.lacapanna.eu:8000/radio.mp3', '2023-07-10 15:20:33.760676');
`;

(async () => {
    await executeQuery(query, values = []).catch((e) => {
        console.log(`[${table}] Error seeding the table: `.red, e);
        process.exit(0);
    });

    console.log(`[${table}] seeded with success!`.green);
})();