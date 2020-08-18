const initialState = [
    [
        1,
        "mattis.",
        "eu eros. Nam consequat dolor",
        "Acton Horn",
        "Jul 9, 2021"
    ],
    [
        2,
        "sit",
        "sit amet orci.",
        "Prescott Rhodes",
        "Feb 28, 2021"
    ],
    [
        3,
        "nonummy",
        "auctor,",
        "Lev Gallegos",
        "Jun 2, 2021"
    ],
    [
        4,
        "Lorem",
        "fames",
        "Addison Rodriquez",
        "Oct 23, 2019"
    ],
    [
        5,
        "nulla",
        "nec luctus felis",
        "Phelan Lee",
        "Nov 14, 2020"
    ],
    [
        6,
        "amet",
        "erat, eget",
        "Wing Shaw",
        "May 12, 2021"
    ],
    [
        7,
        "molestie",
        "nec, euismod in, dolor.",
        "Preston Woodward",
        "Sep 16, 2020"
    ],
    [
        8,
        "Vivamus",
        "sem elit,",
        "Ulric Phelps",
        "Dec 5, 2020"
    ],
    [
        9,
        "diam.",
        "Pellentesque habitant morbi",
        "Guy Day",
        "Oct 24, 2019"
    ],
    [
        10,
        "gravida",
        "dui,",
        "Tarik Kim",
        "Jul 28, 2020"
    ],
    [
        11,
        "nunc.",
        "nibh. Quisque nonummy",
        "Lewis Stark",
        "Sep 10, 2020"
    ],
    [
        12,
        "Aliquam",
        "feugiat. Sed nec metus facilisis",
        "Aaron Nichols",
        "Apr 1, 2021"
    ],
    [
        13,
        "eu",
        "magna a",
        "Christopher Cohen",
        "Sep 18, 2019"
    ],
    [
        14,
        "eu,",
        "orci, adipiscing non,",
        "Jacob Yang",
        "Nov 10, 2019"
    ],
    [
        15,
        "massa",
        "vel,",
        "Raymond Jenkins",
        "Aug 27, 2020"
    ],
    [
        16,
        "sed,",
        "Nulla eget metus eu",
        "Eagan Whitehead",
        "Jul 5, 2021"
    ],
    [
        17,
        "risus.",
        "nisl. Maecenas malesuada fringilla",
        "Russell Farley",
        "Dec 11, 2020"
    ],
    [
        18,
        "euismod",
        "Donec egestas. Duis ac arcu.",
        "John Rhodes",
        "Nov 26, 2019"
    ],
    [
        19,
        "mi.",
        "metus",
        "Travis Young",
        "Mar 3, 2020"
    ],
    [
        20,
        "at",
        "mollis. Duis",
        "Rigel Ellison",
        "Jun 11, 2020"
    ],
    [
        21,
        "pharetra.",
        "Lorem ipsum dolor sit amet,",
        "Lamar Wilkins",
        "Sep 27, 2020"
    ],
    [
        22,
        "Phasellus",
        "Pellentesque tincidunt",
        "Damian Riddle",
        "Feb 11, 2021"
    ],
    [
        23,
        "Phasellus",
        "feugiat. Sed nec metus facilisis",
        "Carlos Osborn",
        "May 2, 2020"
    ],
    [
        24,
        "Curabitur",
        "Cras dictum",
        "Warren Chen",
        "Apr 10, 2021"
    ],
    [
        25,
        "enim",
        "ornare tortor at risus.",
        "Bevis Newman",
        "Dec 31, 2019"
    ],
    [
        26,
        "cursus.",
        "eu, eleifend nec, malesuada ut,",
        "Hall Glover",
        "Mar 4, 2020"
    ],
    [
        27,
        "nulla.",
        "egestas, urna justo faucibus lectus,",
        "Avram Dorsey",
        "Dec 25, 2020"
    ],
    [
        28,
        "Etiam",
        "sem semper",
        "Hasad Mccormick",
        "Feb 15, 2020"
    ],
    [
        29,
        "sem",
        "mauris, rhoncus id,",
        "Amos Hartman",
        "Jul 18, 2020"
    ],
    [
        30,
        "cursus",
        "in",
        "Marsden Mcmahon",
        "Dec 7, 2020"
    ],
    [
        31,
        "Suspendisse",
        "sed consequat auctor,",
        "Jonas Poole",
        "Sep 21, 2019"
    ],
    [
        32,
        "consectetuer",
        "habitant morbi tristique senectus",
        "Gregory Dawson",
        "Sep 21, 2019"
    ],
    [
        33,
        "Integer",
        "sed tortor. Integer",
        "Marsden Hancock",
        "Jun 29, 2021"
    ],
    [
        34,
        "dolor.",
        "ante. Vivamus non lorem vitae",
        "Joshua Kline",
        "Jun 25, 2021"
    ],
    [
        35,
        "dignissim",
        "justo eu arcu.",
        "Patrick Barnett",
        "Oct 13, 2019"
    ],
    [
        36,
        "Phasellus",
        "eu erat semper",
        "Ulysses Fox",
        "Mar 2, 2021"
    ],
    [
        37,
        "mi",
        "natoque penatibus",
        "Carter Roman",
        "May 3, 2021"
    ],
    [
        38,
        "egestas.",
        "lacinia orci, consectetuer euismod",
        "Coby Dorsey",
        "Jul 6, 2021"
    ],
    [
        39,
        "eu",
        "Nam tempor diam dictum",
        "Cade Thornton",
        "Mar 16, 2021"
    ],
    [
        40,
        "Donec",
        "eget massa.",
        "Cade Buckner",
        "May 11, 2021"
    ],
    [
        41,
        "sapien,",
        "ante",
        "Quamar Stephens",
        "Aug 16, 2021"
    ],
    [
        42,
        "odio.",
        "dis parturient montes,",
        "Walker James",
        "Dec 24, 2020"
    ],
    [
        43,
        "posuere",
        "Morbi neque tellus,",
        "Kadeem Mullins",
        "Mar 22, 2020"
    ],
    [
        44,
        "pharetra",
        "elit",
        "Hector Olsen",
        "Aug 10, 2021"
    ],
    [
        45,
        "aliquet.",
        "vehicula et, rutrum eu,",
        "Brett Acosta",
        "Jan 2, 2020"
    ],
    [
        46,
        "blandit",
        "Cum sociis",
        "Austin Oconnor",
        "Aug 31, 2019"
    ],
    [
        47,
        "Etiam",
        "sociis natoque penatibus et",
        "Macon Short",
        "Nov 11, 2020"
    ],
    [
        48,
        "amet,",
        "mauris.",
        "Alan Rosa",
        "Oct 21, 2019"
    ],
    [
        49,
        "mollis",
        "justo",
        "Samuel Adkins",
        "Sep 24, 2019"
    ],
    [
        50,
        "diam.",
        "mauris, rhoncus id,",
        "Gabriel Bonner",
        "Jun 9, 2020"
    ],
    [
        51,
        "convallis",
        "enim, condimentum eget, volutpat ornare,",
        "Ashton Vasquez",
        "Mar 21, 2021"
    ],
    [
        52,
        "semper.",
        "Duis volutpat nunc",
        "Stone Holcomb",
        "Nov 17, 2019"
    ],
    [
        53,
        "malesuada",
        "faucibus",
        "Ivor Alston",
        "Aug 22, 2020"
    ],
    [
        54,
        "tellus",
        "ac",
        "Joel Navarro",
        "Oct 17, 2020"
    ],
    [
        55,
        "orci",
        "eu",
        "Shad Miranda",
        "Oct 3, 2019"
    ],
    [
        56,
        "et",
        "condimentum eget,",
        "Salvador Kidd",
        "Jan 4, 2021"
    ],
    [
        57,
        "senectus",
        "magna. Praesent",
        "Igor Odom",
        "Jul 31, 2021"
    ],
    [
        58,
        "sem,",
        "nec orci. Donec nibh.",
        "Lucas Barlow",
        "Sep 19, 2020"
    ],
    [
        59,
        "dolor",
        "risus. Donec egestas. Duis",
        "Lev Knight",
        "Aug 12, 2021"
    ],
    [
        60,
        "a",
        "tellus",
        "Preston Blackburn",
        "Mar 12, 2020"
    ],
    [
        61,
        "pharetra,",
        "orci. Donec nibh.",
        "Connor Frazier",
        "Nov 18, 2019"
    ],
    [
        62,
        "volutpat",
        "arcu imperdiet ullamcorper. Duis at",
        "Kamal Berry",
        "Aug 6, 2020"
    ],
    [
        63,
        "neque.",
        "inceptos hymenaeos. Mauris ut quam",
        "Ezra Grimes",
        "Nov 8, 2019"
    ],
    [
        64,
        "orci",
        "ut mi. Duis risus odio,",
        "Kirk Murphy",
        "Jan 11, 2021"
    ],
    [
        65,
        "nisi",
        "aliquet",
        "Eric Walter",
        "Dec 17, 2020"
    ],
    [
        66,
        "Suspendisse",
        "pede. Nunc",
        "Finn Wise",
        "Jul 14, 2021"
    ],
    [
        67,
        "placerat.",
        "commodo at,",
        "Ethan Hudson",
        "Oct 9, 2019"
    ],
    [
        68,
        "magna.",
        "arcu",
        "Yardley Stewart",
        "Aug 31, 2020"
    ],
    [
        69,
        "Duis",
        "Proin eget",
        "Marvin Byers",
        "Aug 21, 2020"
    ],
    [
        70,
        "Cras",
        "nisl arcu iaculis",
        "Daquan Burch",
        "Jul 20, 2020"
    ],
    [
        71,
        "Duis",
        "semper",
        "Ferris Madden",
        "May 23, 2021"
    ],
    [
        72,
        "metus.",
        "Curabitur",
        "Quamar Griffin",
        "Aug 5, 2021"
    ],
    [
        73,
        "egestas.",
        "neque. In",
        "Perry Dotson",
        "Sep 11, 2019"
    ],
    [
        74,
        "nibh",
        "ac urna. Ut tincidunt vehicula",
        "Kevin Nelson",
        "Oct 18, 2020"
    ],
    [
        75,
        "sollicitudin",
        "nibh. Donec est mauris, rhoncus",
        "Yuli Copeland",
        "Sep 15, 2019"
    ],
    [
        76,
        "Vivamus",
        "montes, nascetur ridiculus mus.",
        "Buckminster Stone",
        "Nov 18, 2019"
    ],
    [
        77,
        "Aenean",
        "iaculis enim,",
        "Scott Lane",
        "Jan 30, 2021"
    ],
    [
        78,
        "posuere",
        "faucibus ut, nulla. Cras eu",
        "Sean Carpenter",
        "Oct 6, 2019"
    ],
    [
        79,
        "hendrerit",
        "dapibus gravida.",
        "Aristotle Boyd",
        "Dec 17, 2019"
    ],
    [
        80,
        "sociis",
        "laoreet",
        "Nolan Dawson",
        "Oct 17, 2019"
    ],
    [
        81,
        "volutpat.",
        "magna",
        "Beau Hahn",
        "Jun 21, 2021"
    ],
    [
        82,
        "ut",
        "sagittis felis. Donec tempor, est",
        "Allen Rivera",
        "Jul 28, 2021"
    ],
    [
        83,
        "Sed",
        "turpis. Aliquam",
        "Camden Pruitt",
        "Aug 21, 2020"
    ],
    [
        84,
        "at",
        "metus facilisis",
        "Barclay Jimenez",
        "Sep 11, 2020"
    ],
    [
        85,
        "nisi.",
        "cursus et, magna. Praesent interdum",
        "Roth Mcleod",
        "Aug 19, 2020"
    ],
    [
        86,
        "convallis,",
        "gravida nunc sed",
        "Judah Stewart",
        "Dec 9, 2020"
    ],
    [
        87,
        "quam,",
        "Aliquam gravida",
        "Nissim Barnett",
        "Nov 10, 2019"
    ],
    [
        88,
        "aliquam",
        "eget,",
        "Scott Carroll",
        "Sep 17, 2019"
    ],
    [
        89,
        "pede.",
        "vel quam dignissim",
        "Camden Winters",
        "Sep 2, 2019"
    ],
    [
        90,
        "augue",
        "at, velit. Pellentesque ultricies",
        "Wylie Huffman",
        "Jun 1, 2021"
    ],
    [
        91,
        "mus.",
        "dictum ultricies ligula. Nullam",
        "Troy Galloway",
        "Nov 3, 2019"
    ],
    [
        92,
        "dignissim",
        "enim, condimentum eget, volutpat ornare,",
        "Armand Griffith",
        "Dec 30, 2019"
    ],
    [
        93,
        "Duis",
        "velit. Aliquam",
        "Brett Day",
        "Jul 18, 2020"
    ],
    [
        94,
        "at",
        "mauris ut",
        "Stephen Tanner",
        "Jan 13, 2021"
    ],
    [
        95,
        "nec",
        "risus. Quisque libero",
        "Leonard Mcfarland",
        "Nov 26, 2019"
    ],
    [
        96,
        "nisl.",
        "metus vitae velit",
        "Merrill Tate",
        "Jan 20, 2020"
    ],
    [
        97,
        "tellus.",
        "eu, eleifend nec, malesuada",
        "Gary Kennedy",
        "Oct 1, 2019"
    ],
    [
        98,
        "amet",
        "ac orci. Ut semper",
        "Francis Munoz",
        "Dec 31, 2020"
    ],
];

const posts = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default posts;
