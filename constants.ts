
import { MapCell, AppConfig } from './types';

export const APP_CONFIG: AppConfig = {
  lockDay: 4, // Thursday
  lockHour: 12, // 12:00
  workingDays: [0, 1, 2, 3, 4], // Sun to Thu
};

const SEAT_NAMES: Record<string, string> = {
"1": "Name1",
"2": "Name2",
"3": "Name3",
"4": "Name4",
"5": "Name5",
"6": "Name6",
"7": "Name7",
"8": "Name8",
"9": "Name9",
"10": "Name10",
"11": "Name11",
"12": "Name12",
"13": "Name13",
"14": "Name14",
"15": "Name15",
"16": "Name16",
"17": "Name17",
"18": "Name18",
"19": "Name19",
"20": "Name20",
"21": "Name21",
"22": "Name22",
"23": "Name23",
"24": "Name24",
"25": "Name25",
"26": "Name26",
"27": "Name27",
"28": "Name28",
"29": "Name29",
"30": "Name30",
"31": "Name31",
"32": "Name32",
"33": "Name33",
"34": "Name34",
"35": "Name35",
"36": "Name36",
"37": "Name37",
"38": "Name38",
"39": "Name39",
"40": "Name40",
"41": "Name41",
"42": "Name42",
"43": "Name43",
"44": "Name44",
"45": "Name45",
"46": "Name46",
"47": "Name47",
"48": "Name48",
"49": "Name49",
"50": "Name50",
"51": "Name51",
"52": "Name52"
};

const SEAT_MONITORS: Record<string, 1 | 2> = {
  "1": 2,
  "2": 2,
  "3": 2,
  "4": 2,
  "5": 1,
  "6": 2,
  "7": 2,
  "8": 2,
  "9": 1,
  "10": 1,
  "11": 1,
  "12": 2,
  "13": 2,
  "14": 1,
  "15": 1,
  "16": 1,
  "17": 1,
  "18": 2,
  "19": 2,
  "20": 2,
  "21": 1,
  "22": 1,
  "23": 1,
  "24": 2,
  "25": 1,
  "26": 2,
  "27": 1,
  "28": 2,
  "29": 1,
  "30": 1,
  "31": 2,
  "32": 1,
  "33": 1,
  "34": 1,
  "35": 2,
  "36": 1,
  "37": 2,
  "38": 1,
  "39": 1,
  "40": 1,
  "41": 1,
  "42": 1,
  "43": 1,
  "44": 1,
  "45": 1,
  "46": 2,
  "47": 1,
  "48": 1,
  "49": 1,
  "50": 2,
  "51": 2,
  "52": 2
};

const MAP_CSV = `
F,F,F,F,F,F,F,F,F,R,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F
F,F,F,F,F,F,F,F,F,R,F,F,F,F,F,F,F,F,F,F,F,19,21,F,23,F,F,F,F
F,35,F,38,40,F,43,F,F,R,F,1,5,F,9,12,F,52,F,F,F,20,22,F,24,F,F,F,F
F,36,F,39,41,F,44,48,F,Wall,F,2,6,F,10,13,F,15,17,F,F,F,F,F,25,F,F,F,F
F,37,F,F,F,F,45,49,F,R,F,3,7,F,11,14,F,16,18,F,R,R,R,F,F,F,F,F,F
F,F,F,F,F,F,46,50,F,R,F,4,8,F,F,F,F,F,F,F,R,R,R,F,26,28,F,31,F
F,F,F,F,42,F,47,51,F,R,F,F,F,F,R,R,Phone Booths,R,R,F,R,Aberfeldy,R,F,27,29,F,32,F
F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,R,R,R,F,F,F,F,33,F
F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,30,34,F,F
F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F
`.trim();

const generateMapData = (): MapCell[] => {
  const rows = MAP_CSV.split('\n');
  const cells: MapCell[] = [];
  
  const height = rows.length;
  const width = rows[0].split(',').length;
  
  cells.push({ 
    type: 'meta', 
    id: 'canvas', 
    x: 1, y: 1, 
    w: width, h: height, 
    fill: 'transparent', 
    label1: 'Office' 
  });

  const SPECIAL_ROOMS = ["Wall", "Phone Booths", "Aberfeldy"];

  rows.forEach((rowStr, yIdx) => {
    const cols = rowStr.split(',');
    cols.forEach((val, xIdx) => {
      const x = xIdx + 1;
      const y = yIdx + 1;
      const id = `cell-${x}-${y}`;
      
      if (val === 'F') {
        cells.push({
          type: 'zone',
          id,
          x, y, w: 1, h: 1,
          fill: '#f1f5f9', // Light Grey Floor
          label1: ''
        });
      } else if (val === 'R' || SPECIAL_ROOMS.includes(val)) {
        cells.push({
          type: 'zone',
          id,
          x, y, w: 1, h: 1,
          fill: '#e2e8f0', // Neutral Gray Room/Wall
          label1: val === 'R' ? '' : val
        });
      } else if (!isNaN(Number(val)) && val.trim() !== '') {
        cells.push({
          type: 'seat',
          id: val,
          x, y, w: 1, h: 1,
          fill: '#C6E0B4', // Original Green
          label1: val,
          label2: SEAT_NAMES[val] || '',
          monitorsCount: SEAT_MONITORS[val] || 1
        });
      }
    });
  });

  return cells;
};

export const MAP_DATA: MapCell[] = generateMapData();
