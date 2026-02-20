
import { MapCell, AppConfig } from './types';

export const APP_CONFIG: AppConfig = {
  lockDay: 4, // Thursday
  lockHour: 14, // 14:00
  workingDays: [0, 1, 2, 3, 4], // Sun to Thu
};

const SEAT_NAMES: Record<string, string> = {
  "1": "Yahav Sofer",
  "2": "Bar Ziony",
  "3": "Ido Bar-Lev",
  "4": "Yarden Messika",
  "5": "Gleb Zhelezniak",
  "6": "Alex Hefetz",
  "7": "Jonathan Rozenblat",
  "8": "Jonathan Levanon",
  "9": "Shir Goldfarb",
  "10": "Gil Shelef",
  "11": "Tomer Mardan",
  "12": "Itay Issashar",
  "13": "Ofer Lazmi",
  "14": "Daniel Ammar",
  "15": "Dor Shtainman",
  "16": "Avinoam Kugler",
  "17": "Eliel Hojman",
  "18": "Eran Levav",
  "19": "Benel Tayar",
  "20": "Avishai Hendel",
  "21": "Mika Kost",
  "22": "Yohai Ido",
  "23": "Tom Melloul",
  "24": "Matan Georgi",
  "25": "Yaniv Fleischer",
  "26": "Tomer Marx",
  "27": "Alisa Utkin",
  "28": "Ofir Cooper",
  "29": "Nadav Gover",
  "30": "Bar Nagauker",
  "31": "Asaf Shoshany",
  "32": "Eldar Bakelman",
  "33": "Haleli Amiad Steinberg",
  "34": "Elias Cohenca",
  "35": "Ronen Reshef",
  "36": "Moral Segal",
  "37": "Ori Silberg",
  "38": "Amir Puri",
  "39": "Tamar Zanger",
  "40": "Aviad Shlaien",
  "41": "Yuval Fritz",
  "42": "Itamar Wilf",
  "43": "Yoav Wolfson",
  "44": "Amir Cohen",
  "45": "Nitzan Friedman",
  "46": "Itai Bardan",
  "47": "Joseph Tenenbaum",
  "48": "Moti Bachar",
  "49": "Sarah Belson",
  "50": "Aviv Aharonovich",
  "51": "Jaymie Isaacs"
};

const MAP_CSV = `
F,F,F,F,F,F,F,F,F,R,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F
F,F,F,F,F,F,F,F,F,R,F,F,F,F,F,F,F,F,F,F,F,19,21,F,23,F,F,F,F
F,35,F,38,40,F,43,F,F,R,F,1,5,F,9,12,F,F,F,F,F,20,22,F,24,F,F,F,F
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
          label2: SEAT_NAMES[val] || ''
        });
      }
    });
  });

  return cells;
};

export const MAP_DATA: MapCell[] = generateMapData();
