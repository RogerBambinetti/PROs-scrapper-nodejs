const puppeteer = require('puppeteer');
const utils = require('../utils/util');

const url = "https://www.ascap.com/repertory#/ace/search/writer/FURLER%20SIA%20KATE%20I";

async function getData() {
    try {
        return [
            {
                "titleType": "O",
                "shIPI": "89259185",
                "shName": "1 1"
            },
            {
                "titleType": "O",
                "shIPI": "216406260",
                "shName": "1 + 1 (FEAT. AMIR)"
            },
            {
                "titleType": "O",
                "shIPI": "229063510",
                "shName": "12 NIGHTS"
            },
            {
                "titleType": "O",
                "shIPI": "229063669",
                "shName": "3 MINUTES 'TIL NEW YEARS"
            },
            {
                "titleType": "O",
                "shIPI": "73602115",
                "shName": "85 BLOCKS"
            },
            {
                "titleType": "O",
                "shIPI": "228468059",
                "shName": "ABOUT U"
            },
            {
                "titleType": "O",
                "shIPI": "35541948",
                "shName": "ACADEMIA"
            },
            {
                "titleType": "O",
                "shIPI": "87589612",
                "shName": "ACCESS HOLLYWOOD"
            },
            {
                "titleType": "O",
                "shIPI": "87089396",
                "shName": "ACCESS HOLLYWOOD LIVE"
            },
            {
                "titleType": "O",
                "shIPI": "75897039",
                "shName": "ACID RAIN"
            },
            {
                "titleType": "A",
                "shIPI": "75897039",
                "shName": "ACID RAIN F/J.COLE"
            },
            {
                "titleType": "O",
                "shIPI": "213832431",
                "shName": "AJ AND THE QUEEN"
            },
            {
                "titleType": "O",
                "shIPI": "203808254",
                "shName": "A L INFINI"
            },
            {
                "titleType": "O",
                "shIPI": "83270146",
                "shName": "ALIVE"
            },
            {
                "titleType": "O",
                "shIPI": "89193068",
                "shName": "ALIVE"
            },
            {
                "titleType": "O",
                "shIPI": "94301286",
                "shName": "ALIVE"
            },
            {
                "titleType": "O",
                "shIPI": "76474637",
                "shName": "ALL I NEED"
            },
            {
                "titleType": "O",
                "shIPI": "87653970",
                "shName": "ALL I NEED"
            },
            {
                "titleType": "O",
                "shIPI": "76558710",
                "shName": "ALL MY LOVE I LL SEND"
            },
            {
                "titleType": "O",
                "shIPI": "214460191",
                "shName": "AMERICAN IDOL"
            },
            {
                "titleType": "O",
                "shIPI": "215111519",
                "shName": "AMERICAN IDOL"
            },
            {
                "titleType": "O",
                "shIPI": "215157313",
                "shName": "AMERICAN IDOL"
            },
            {
                "titleType": "O",
                "shIPI": "92228285",
                "shName": "AMERICAN IDOL"
            },
            {
                "titleType": "O",
                "shIPI": "92228340",
                "shName": "AMERICAN IDOL"
            },
            {
                "titleType": "O",
                "shIPI": "215254073",
                "shName": "AMERICA S GOT TALENT"
            },
            {
                "titleType": "O",
                "shIPI": "215258732",
                "shName": "AMERICA S GOT TALENT"
            },
            {
                "titleType": "O",
                "shIPI": "215263851",
                "shName": "AMERICA S GOT TALENT"
            },
            {
                "titleType": "O",
                "shIPI": "215319584",
                "shName": "AMERICA S GOT TALENT"
            },
            {
                "titleType": "O",
                "shIPI": "94724951",
                "shName": "AMERICA S GOT TALENT"
            },
            {
                "titleType": "O",
                "shIPI": "213841490",
                "shName": "AMERICA S GOT TALENT THE CHAMPIONS"
            },
            {
                "titleType": "O",
                "shIPI": "84168885",
                "shName": "ANGEL BY THE WINGS"
            },
            {
                "titleType": "O",
                "shIPI": "200056380",
                "shName": "ANGEL IN YOUR EYES"
            },
            {
                "titleType": "O",
                "shIPI": "200700036",
                "shName": "ANGEL IN YOUR EYES"
            },
            {
                "titleType": "O",
                "shIPI": "81409935",
                "shName": "ANNIE"
            },
            {
                "titleType": "O",
                "shIPI": "94070108",
                "shName": "ANTHEM"
            },
            {
                "titleType": "O",
                "shIPI": "224667624",
                "shName": "ANY DAY NOW"
            },
            {
                "titleType": "O",
                "shIPI": "76111496",
                "shName": "ANY DAY NOW"
            },
            {
                "titleType": "A",
                "shIPI": "76939102",
                "shName": "AROUND YOUR LITTLE FINGER"
            },
            {
                "titleType": "O",
                "shIPI": "205376621",
                "shName": "ARRESTED"
            },
            {
                "titleType": "O",
                "shIPI": "90723678",
                "shName": "ARRESTED"
            },
            {
                "titleType": "O",
                "shIPI": "212177303",
                "shName": "AT THE HEART OF GOLD INSIDE THE USA GYMNASTICS SCA"
            },
            {
                "titleType": "O",
                "shIPI": "207934094",
                "shName": "AUDIO"
            },
            {
                "titleType": "O",
                "shIPI": "221551289",
                "shName": "AUDIO"
            },
            {
                "titleType": "O",
                "shIPI": "91974641",
                "shName": "AUDIO"
            },
            {
                "titleType": "O",
                "shIPI": "210465850",
                "shName": "BAD COMPANY"
            },
            {
                "titleType": "O",
                "shIPI": "90970760",
                "shName": "BAILA SI PUEDES"
            },
            {
                "titleType": "O",
                "shIPI": "84220844",
                "shName": "BANG MY HEAD"
            },
            {
                "titleType": "O",
                "shIPI": "94814979",
                "shName": "BANG MY HEAD"
            },
            {
                "titleType": "A",
                "shIPI": "94814979",
                "shName": "BANG MY HEAD FEAT SIA"
            },
            {
                "titleType": "A",
                "shIPI": "84220844",
                "shName": "BANG MY HEAD FEAT SIA AND FETTY WAP"
            },
            {
                "titleType": "O",
                "shIPI": "77141873",
                "shName": "BATTLE CRY"
            },
            {
                "titleType": "O",
                "shIPI": "75177021",
                "shName": "BATTLEFIELD"
            },
            {
                "titleType": "O",
                "shIPI": "92832512",
                "shName": "BEAR GRYLLS SURVIVAL SCHOOL"
            },
            {
                "titleType": "O",
                "shIPI": "215099986",
                "shName": "BEAT SHAZAM"
            },
            {
                "titleType": "O",
                "shIPI": "215108158",
                "shName": "BEAT SHAZAM"
            },
            {
                "titleType": "A",
                "shIPI": "71055274",
                "shName": "BEAUTIFUL CALM"
            },
            {
                "titleType": "O",
                "shIPI": "33311636",
                "shName": "BEAUTIFUL CALM DRIVING"
            },
            {
                "titleType": "O",
                "shIPI": "71055274",
                "shName": "BEAUTIFUL CALM DRIVING"
            },
            {
                "titleType": "O",
                "shIPI": "79407089",
                "shName": "BEAUTIFUL PAIN"
            },
            {
                "titleType": "O",
                "shIPI": "91923697",
                "shName": "BEAUTIFUL PEOPLE SAY"
            },
            {
                "titleType": "O",
                "shIPI": "208178057",
                "shName": "BEAUTIFUL THINGS CAN HAPPEN"
            },
            {
                "titleType": "O",
                "shIPI": "47599628",
                "shName": "BE GOOD TO ME"
            },
            {
                "titleType": "O",
                "shIPI": "74025918",
                "shName": "BE GOOD TO ME"
            },
            {
                "titleType": "O",
                "shIPI": "87358830",
                "shName": "BEST DAY EVER"
            },
            {
                "titleType": "A",
                "shIPI": "224662569",
                "shName": "BEST FRIEND"
            },
            {
                "titleType": "O",
                "shIPI": "89927241",
                "shName": "BETTER"
            },
            {
                "titleType": "O",
                "shIPI": "70864271",
                "shName": "BIG GIRLLITTLE GIRL"
            },
            {
                "titleType": "A",
                "shIPI": "70864271",
                "shName": "BIG GIRL LITTLE GIRL"
            },
            {
                "titleType": "O",
                "shIPI": "75109453",
                "shName": "BIG GIRL LITTLE GIRL"
            },
            {
                "titleType": "A",
                "shIPI": "80303621",
                "shName": "BIG GIRLS"
            },
            {
                "titleType": "A",
                "shIPI": "91011744",
                "shName": "BIG GIRLS"
            },
            {
                "titleType": "O",
                "shIPI": "80303621",
                "shName": "BIG GIRLS CRY"
            },
            {
                "titleType": "O",
                "shIPI": "80038611",
                "shName": "BILLBOARD MUSIC AWARDS 2014"
            },
            {
                "titleType": "O",
                "shIPI": "217620188",
                "shName": "BIRD SET FREE"
            },
            {
                "titleType": "O",
                "shIPI": "79834246",
                "shName": "BIRD SET FREE"
            },
            {
                "titleType": "O",
                "shIPI": "32480150",
                "shName": "BITING TONGUES"
            },
            {
                "titleType": "O",
                "shIPI": "38538145",
                "shName": "BITING TONGUES"
            },
            {
                "titleType": "O",
                "shIPI": "224665411",
                "shName": "BLACK BUTTERFLY"
            },
            {
                "titleType": "O",
                "shIPI": "75958870",
                "shName": "BLACK BUTTERFLY"
            },
            {
                "titleType": "O",
                "shIPI": "73870006",
                "shName": "BLAME"
            },
            {
                "titleType": "O",
                "shIPI": "75519085",
                "shName": "BLANK PAGE"
            },
            {
                "titleType": "O",
                "shIPI": "234059058",
                "shName": "BLINDED BY LOVE"
            },
            {
                "titleType": "O",
                "shIPI": "79372807",
                "shName": "BLINDED BY LOVE"
            },
            {
                "titleType": "O",
                "shIPI": "218827947",
                "shName": "BORN YESTERDAY"
            },
            {
                "titleType": "O",
                "shIPI": "224636701",
                "shName": "BORN YESTERDAY"
            },
            {
                "titleType": "O",
                "shIPI": "80726687",
                "shName": "BOTTLE"
            },
            {
                "titleType": "O",
                "shIPI": "225670281",
                "shName": "BOTTOMS UP"
            },
            {
                "titleType": "O",
                "shIPI": "81367708",
                "shName": "BOTTOMS UP"
            },
            {
                "titleType": "O",
                "shIPI": "207486784",
                "shName": "BOUND TO YOU"
            },
            {
                "titleType": "O",
                "shIPI": "210351565",
                "shName": "BOUND TO YOU"
            },
            {
                "titleType": "O",
                "shIPI": "70726070",
                "shName": "BOUND TO YOU"
            },
            {
                "titleType": "O",
                "shIPI": "71099496",
                "shName": "BOUND TO YOU"
            },
            {
                "titleType": "O",
                "shIPI": "82447538",
                "shName": "BOY PROBLEMS"
            },
            {
                "titleType": "O",
                "shIPI": "74970970",
                "shName": "BREAK THE WALLS"
            },
            {
                "titleType": "O",
                "shIPI": "76071613",
                "shName": "BREAK THE WALLS"
            },
            {
                "titleType": "O",
                "shIPI": "29486569",
                "shName": "BREATHE ME"
            },
            {
                "titleType": "O",
                "shIPI": "79351818",
                "shName": "BRIGHTEST MORNING STAR"
            },
            {
                "titleType": "O",
                "shIPI": "93107784",
                "shName": "BRIGHTEST MORNING STAR"
            },
            {
                "titleType": "O",
                "shIPI": "34578016",
                "shName": "BRING IT TO ME"
            },
            {
                "titleType": "O",
                "shIPI": "73871858",
                "shName": "BRING IT TO ME"
            },
                {
                    "titleType": "O",
                    "shIPI": "33311797",
                    "shName": "BRING NIGHT"
                },
                {
                    "titleType": "O",
                    "shIPI": "75957150",
                    "shName": "BRING THE PARTY"
                },
                {
                    "titleType": "O",
                    "shIPI": "224659842",
                    "shName": "BRING YOUR ARMS"
                },
                {
                    "titleType": "O",
                    "shIPI": "75957156",
                    "shName": "BRING YOUR ARMS"
                },
                {
                    "titleType": "O",
                    "shIPI": "82740429",
                    "shName": "BRING YOUR ARMS"
                },
                {
                    "titleType": "O",
                    "shIPI": "84168889",
                    "shName": "BROKEN GLASS"
                },
                {
                    "titleType": "O",
                    "shIPI": "38075157",
                    "shName": "BROTHERS AND SISTERS"
                },
                {
                    "titleType": "O",
                    "shIPI": "35506945",
                    "shName": "BRUISE LIKE A PEAR"
                },
                {
                    "titleType": "O",
                    "shIPI": "74055616",
                    "shName": "BRUISE LIKE A PEAR"
                },
                {
                    "titleType": "O",
                    "shIPI": "30267513",
                    "shName": "BULLY"
                },
                {
                    "titleType": "O",
                    "shIPI": "80507921",
                    "shName": "BURN THE PAGES"
                },
                {
                    "titleType": "O",
                    "shIPI": "76558709",
                    "shName": "BUS STOP"
                },
                {
                    "titleType": "O",
                    "shIPI": "75863028",
                    "shName": "BUST ME OUT"
                },
                {
                    "titleType": "O",
                    "shIPI": "29486573",
                    "shName": "BUTTERFLIES"
                },
                {
                    "titleType": "O",
                    "shIPI": "36922567",
                    "shName": "BUTTONS"
                },
                {
                    "titleType": "A",
                    "shIPI": "90899377",
                    "shName": "BU YAO BU YAO DE"
                },
                {
                    "titleType": "O",
                    "shIPI": "38378016",
                    "shName": "BYE BYE BYE"
                },
                {
                    "titleType": "O",
                    "shIPI": "74681406",
                    "shName": "BY YOUR SIDE"
                },
                {
                    "titleType": "O",
                    "shIPI": "75365802",
                    "shName": "CAMERA NEVER LIES"
                },
                {
                    "titleType": "O",
                    "shIPI": "89973486",
                    "shName": "CANDY CANE LANE"
                },
                {
                    "titleType": "O",
                    "shIPI": "78391766",
                    "shName": "CANNONBALL"
                },
                {
                    "titleType": "O",
                    "shIPI": "225422815",
                    "shName": "CARES AT THE DOOR"
                },
                {
                    "titleType": "O",
                    "shIPI": "74681405",
                    "shName": "CAR PARK"
                },
                {
                    "titleType": "O",
                    "shIPI": "73870000",
                    "shName": "CATCHING ON"
                },
                {
                    "titleType": "O",
                    "shIPI": "217209259",
                    "shName": "CBS THIS MORNING SATURDAY"
                },
                {
                    "titleType": "O",
                    "shIPI": "80270374",
                    "shName": "CBS THIS MORNING SATURDAY"
                },
                {
                    "titleType": "O",
                    "shIPI": "92145427",
                    "shName": "CBS THIS MORNING SATURDAY"
                },
                {
                    "titleType": "O",
                    "shIPI": "80511825",
                    "shName": "CELLOPHANE"
                },
                {
                    "titleType": "O",
                    "shIPI": "212159388",
                    "shName": "CERIMONIA DE ENCERRAMENTO DAS PAN"
                },
                {
                    "titleType": "O",
                    "shIPI": "212366363",
                    "shName": "CHAINED TO THE RHYTHM"
                },
                {
                    "titleType": "O",
                    "shIPI": "87674634",
                    "shName": "CHAINED TO THE RHYTHM"
                },
                {
                    "titleType": "O",
                    "shIPI": "233480451",
                    "shName": "CHAMPION"
                },
                {
                    "titleType": "O",
                    "shIPI": "91024254",
                    "shName": "CHAMPION"
                },
                {
                    "titleType": "A",
                    "shIPI": "26358074",
                    "shName": "CHAMPIONS LEAGUE SPECIAL"
                },
                {
                    "titleType": "O",
                    "shIPI": "78998209",
                    "shName": "CHANDELIER"
                },
                {
                    "titleType": "A",
                    "shIPI": "78998209",
                    "shName": "CHANDELIER"
                },
                {
                    "titleType": "O",
                    "shIPI": "204061825",
                    "shName": "CHASING PAPER"
                },
                {
                    "titleType": "O",
                    "shIPI": "83453165",
                    "shName": "CHASING SHADOWS"
                },
                {
                    "titleType": "O",
                    "shIPI": "212221625",
                    "shName": "CHEAP THRILLS"
                },
                {
                    "titleType": "O",
                    "shIPI": "84168887",
                    "shName": "CHEAP THRILLS"
                },
                {
                    "titleType": "A",
                    "shIPI": "84168887",
                    "shName": "CHEAP THRILLS ALBUM VERSION"
                },
                {
                    "titleType": "A",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS CYRIL HAHN REMIX"
                },
                {
                    "titleType": "O",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS FEAT SEAN PAUL"
                },
                {
                    "titleType": "A",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS FEAT SEAN PAUL LE YOUTH REMIX"
                },
                {
                    "titleType": "A",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS HEX COUGAR REMIX"
                },
                {
                    "titleType": "A",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS JOHN J C CARR REMIX"
                },
                {
                    "titleType": "A",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS NOMERO REMIX"
                },
                {
                    "titleType": "A",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS RAC REMIX"
                },
                {
                    "titleType": "A",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS REMIX"
                },
                {
                    "titleType": "A",
                    "shIPI": "84168887",
                    "shName": "CHEAP THRILLS REMIX FEAT NICKY JAM"
                },
                {
                    "titleType": "A",
                    "shIPI": "94446370",
                    "shName": "CHEAP THRILLS STED E AND HYBRID HEIGHTS REMIX"
                },
                {
                    "titleType": "O",
                    "shIPI": "38073475",
                    "shName": "CHOOSE OR LOSE WORK IT"
                },
                {
                    "titleType": "O",
                    "shIPI": "30267514",
                    "shName": "CHURCH OF WHAT S HAPPENING NOW"
                },
                {
                    "titleType": "O",
                    "shIPI": "89283605",
                    "shName": "CITY IS YOURS"
                },
                {
                    "titleType": "O",
                    "shIPI": "45044142",
                    "shName": "CLAP YOUR HANDS"
                },
                {
                    "titleType": "O",
                    "shIPI": "215272691",
                    "shName": "CLOSING BELL CNBC"
                },
                {
                    "titleType": "O",
                    "shIPI": "215273579",
                    "shName": "CLOSING BELL CNBC"
                },
                {
                    "titleType": "O",
                    "shIPI": "225456522",
                    "shName": "CLOUD"
                },
                {
                    "titleType": "O",
                    "shIPI": "33311599",
                    "shName": "CLOUD"
                },
                {
                    "titleType": "O",
                    "shIPI": "88356058",
                    "shName": "CNN HEROES"
                },
                {
                    "titleType": "O",
                    "shIPI": "33311840",
                    "shName": "CODEPENDANT"
                },
                {
                    "titleType": "O",
                    "shIPI": "33382519",
                    "shName": "CODEPENDANT"
                },
                {
                    "titleType": "A",
                    "shIPI": "73871782",
                    "shName": "CODEPENDANT"
                },
                {
                    "titleType": "A",
                    "shIPI": "33311840",
                    "shName": "CODEPENDENT"
                },
                {
                    "titleType": "O",
                    "shIPI": "73871782",
                    "shName": "CODEPENDENT"
                },
                {
                    "titleType": "O",
                    "shIPI": "225652885",
                    "shName": "COLLAPSING"
                },
                {
                    "titleType": "O",
                    "shIPI": "203913561",
                    "shName": "COLOGNE"
                },
                {
                    "titleType": "O",
                    "shIPI": "86222885",
                    "shName": "CONFETTI"
                },
                {
                    "titleType": "O",
                    "shIPI": "74638929",
                    "shName": "CONVERSATION"
                },
                {
                    "titleType": "O",
                    "shIPI": "73973909",
                    "shName": "CONVERSATION 1"
                },
                {
                    "titleType": "O",
                    "shIPI": "74701595",
                    "shName": "CONVERSATION CUES"
                },
                {
                    "titleType": "O",
                    "shIPI": "75853056",
                    "shName": "CONVERSATION CUES"
                },
                {
                    "titleType": "O",
                    "shIPI": "75029092",
                    "shName": "CONVERSATION WITH AMANDA DE CADENET"
                },
                {
                    "titleType": "O",
                    "shIPI": "88283396",
                    "shName": "CONVICTION"
                },
                {
                    "titleType": "O",
                    "shIPI": "74681407",
                    "shName": "CORNER"
                },
                {
                    "titleType": "O",
                    "shIPI": "215056591",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215059616",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215060539",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215062215",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215069141",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215069784",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215072350",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215072930",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215073463",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "215084023",
                    "shName": "CORONATION STREET"
                },
                {
                    "titleType": "O",
                    "shIPI": "213579776",
                    "shName": "COUNTDOWN 2020 E GRAMMY AWARDS"
                },
                {
                    "titleType": "O",
                    "shIPI": "205837995",
                    "shName": "COURAGE"
                },
                {
                    "titleType": "O",
                    "shIPI": "213962428",
                    "shName": "COURAGE"
                },
                {
                    "titleType": "O",
                    "shIPI": "211514616",
                    "shName": "COURAGE TO CHANGE"
                },
                {
                    "titleType": "O",
                    "shIPI": "89943005",
                    "shName": "CRITICISE"
                },
                {
                    "titleType": "O",
                    "shIPI": "224668192",
                    "shName": "CRUSH ME"
                },
                {
                    "titleType": "O",
                    "shIPI": "75957158",
                    "shName": "CRUSH ME"
                },
                {
                    "titleType": "O",
                    "shIPI": "79836539",
                    "shName": "CRUSH ME WITH YOUR LOVE"
                },
                {
                    "titleType": "O",
                    "shIPI": "82740430",
                    "shName": "CRUSH ME WITH YOUR LOVE"
                },
                {
                    "titleType": "O",
                    "shIPI": "88492444",
                    "shName": "CRYING IN THE CLUB"
                },
                {
                    "titleType": "O",
                    "shIPI": "207150020",
                    "shName": "CUT TO THE CHASE"
                },
                {
                    "titleType": "O",
                    "shIPI": "92708984",
                    "shName": "CUT TO THE CHASE"
                },
                {
                    "titleType": "O",
                    "shIPI": "71535668",
                    "shName": "DANS LE NOIR"
                },
                {
                    "titleType": "O",
                    "shIPI": "92902998",
                    "shName": "DATING IN THE DARK"
                },
                {
                    "titleType": "O",
                    "shIPI": "38382088",
                    "shName": "DAY TOO SOON"
                },
        ];
    } catch (e) {
        console.log('An error occurred', e);
    }
}

async function getFormattedData() {
    const data = await getData();

    return data.map(d => {

        return { workId: d.shIPI, title: d.shName, creators: "", source: 'SOCAN' }
    });
}

module.exports = { getFormattedData };