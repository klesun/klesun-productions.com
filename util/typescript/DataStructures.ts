
interface ISongInfo {
    rawFileName: string;
}

interface IShNote {
    // 1.0 - semibreve; 0.25 - quarter note; 0.1666 - triplet of a half note; and so on
    length: number;
    // midi channel number in range [0..16)
    channel: number;
    // midi noteOn event second byte - range [0..128)
    tune: number;
}

interface IShmidusicChord {
    noteList: Array<IShNote>;
}

interface ITimedShChord extends IShmidusicChord {
    timeFraction: number;
}

// output of github.com/klesun/shmidusic
interface IShmidusicStructure {
    staffList: Array<{
        staffConfig: {
            /*
            * when tempo is 60: 1/4 note length = 1 second;
            * when tempo is 240: 1/4 note length = 1/4 second
            */
            tempo: number;
            /*
            * a number in range [-7, 7]. when -1: Ti is flat;
            * when -2: Ti and Mi are flat; when +2: Fa and Re are sharp and so on...
            */
            keySignature: number;
            /*
            * tact size in legacy format (i used to store numbers in bytes ages ago...)
            * if you divide it with, uh well, 8, you get the tact size
            */
            numerator: number;
            channelList: Array<{
                // midi program number in range [0..128)
                instrument: number;
                // midi channel number in range [0..16)
                channelNumber: number;
                // midi channel starting volume in percents [0..100]
                volume: number;
            }>;
        };
        chordList: Array<IShmidusicChord>;
    }>;
}

interface ISmfNote {
    /* midi value: [0..128) */
    tune: number;
    /* in "ticks" */
    duration: number;
    /* midi channel: [0..16) */
    channel: number;
    /* in "ticks" - when note starts */
    time: number;
}

// decoded midi file
interface ISmfStructure {
    /*
    * "ticks" per second. the "ticks" is a conventional
    * unit, in which time will be represented further
    */
    division: number;
    tempoEventList: Array<{
        tempo: number; // value
        time: number; // start on
    }>;
    /* midi program numbers by channel number */
    instrumentDict: {
        [id: number]: number;
    };
    noteList: Array<ISmfNote>;
}

interface ISmfFile {
    rawFileName: string;
    fileName: string; // score will be cropped
    score: string;
}

// we include js with the "Globals" declaration
// in /htbin/cgi_script.py::pass_server_data_to_js()
// but now it contains only a single value "shmidusicList",
// that should be fetched separately eventually
interface IGlobals {
    shmidusicList: Array<{
        fileName: string;
        sheetMusic: IShmidusicStructure
    }>;
}