
// Career Hub Data Model
const sectors = [
  {
    id: "mining",
    title: "Уул уурхай, эрдэс боловсруулалт",
    description: "Металл ба металл бус ашигт малтмалын олборлолт, баяжуулалт, боловсруулалт, уурхайн технологи.",
    icon: "pickaxe"
  },
  {
    id: "metallurgy",
    title: "Металлурги, төмөрлөг",
    description: "Төмөр, ган, өнгөт металл, хайлш, баяжмал, металл материалын боловсруулалт.",
    icon: "flame"
  },
  {
    id: "construction-materials",
    title: "Барилгын материал, цемент",
    description: "Цемент, клинкер, бетон, керамик, шохойн чулуу, зам болон барилгын материал.",
    icon: "building"
  },
  {
    id: "energy",
    title: "Эрчим хүч",
    description: "Эрчим хүч, шатахуун, дулаан, цахилгаан, тоног төхөөрөмжийн материалын найдвартай ажиллагаа.",
    icon: "zap"
  },
  {
    id: "laboratory-quality",
    title: "Лаборатори, чанарын хяналт",
    description: "Түүхий эд, бүтээгдэхүүн, материалын сорилт, шинжилгээ, стандарт, QA/QC.",
    icon: "test-tube"
  },
  {
    id: "research-innovation",
    title: "R&D, инноваци",
    description: "Шинэ материал, ногоон технологи, критикал минерал, тоног төхөөрөмж, AI ашигласан материалын дизайн.",
    icon: "lightbulb"
  }
];

const organizations = [
  {
    name: "Оюу Толгой ХХК",
    rankLabel: "ТОП-100 #1",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 1,
    sectorIds: ["mining", "laboratory-quality", "research-innovation"],
    website: "https://www.ot.mn/",
    mtrlOpportunities: ["Баяжуулалт", "Материалын шинжилгээ", "Процессын хяналт", "Лаборатори", "R&D"],
    cooperationPotential: ["Оюутны дадлага", "Дипломын ажил", "Үйлдвэрийн кейс төсөл", "Шинэ төгсөгчийн хөтөлбөр"],
    status: "Хамтын ажиллагааны суурьтай"
  },
  {
    name: "Энержи Ресурс ХХК",
    rankLabel: "ТОП-100 #2",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 2,
    sectorIds: ["mining", "laboratory-quality"],
    website: "https://www.energyresources.mn/",
    mtrlOpportunities: ["Нүүрс баяжуулалт", "Процессын хяналт", "Чанарын хяналт", "Нүүрсний шинжилгээ"],
    cooperationPotential: ["Дадлага", "Дипломын ажил", "Баяжуулалтын кейс төсөл"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Монголын Алт МАК ХХК",
    rankLabel: "ТОП-100 #3",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 3,
    sectorIds: ["mining", "construction-materials", "laboratory-quality", "research-innovation"],
    website: "https://www.mak.mn/",
    mtrlOpportunities: ["Уул уурхай", "Цемент", "Барилгын материал", "Керамик", "Чанарын хяналт", "R&D"],
    cooperationPotential: ["Дадлага", "Дипломын ажил", "Барилгын материалын судалгаа", "Хамтарсан R&D"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "НИК ХХК",
    rankLabel: "ТОП-100 #8",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 8,
    sectorIds: ["energy"],
    website: "",
    mtrlOpportunities: ["Шатахуун, тослох материал", "Агуулах савны материал", "Зэврэлт, аюулгүй ажиллагаа"],
    cooperationPotential: ["Материалын найдвартай ажиллагаа", "Зэврэлт хамгааллын кейс"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "АПУ ХК",
    rankLabel: "ТОП-100 #9",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 9,
    sectorIds: ["laboratory-quality"],
    website: "https://www.apu.mn/",
    mtrlOpportunities: ["Сав баглаа боодол", "Хүнсний үйлдвэрийн QA/QC", "Лабораторийн шинжилгээ"],
    cooperationPotential: ["Чанарын хяналтын дадлага", "Сав баглаа боодлын материалын судалгаа"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Саусгоби Сэндс ХХК",
    rankLabel: "ТОП-100 #10",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 10,
    sectorIds: ["mining"],
    website: "https://www.southgobi.com/",
    mtrlOpportunities: ["Нүүрс олборлолт", "Нүүрсний чанар", "Уурхайн процесс"],
    cooperationPotential: ["Дадлага", "Нүүрсний материалын шинжилгээ"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Шунхлай ХХК",
    rankLabel: "ТОП-100 #14",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 14,
    sectorIds: ["energy"],
    website: "https://www.shunkhlai.mn/",
    mtrlOpportunities: ["Шатахуун, тослох материал", "Сав, агуулах, хоолойн материал", "Зэврэлт"],
    cooperationPotential: ["Материалын аюулгүй ажиллагаа", "Зэврэлт хамгаалал"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Макс Групп ХХК",
    rankLabel: "ТОП-100 #15",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 15,
    sectorIds: ["construction-materials"],
    website: "https://maxgroup.mn/",
    mtrlOpportunities: ["Барилга, дэд бүтэц", "Барилгын материалын чанарын хяналт"],
    cooperationPotential: ["Дадлага", "Барилгын материалын кейс"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Барловорлд Монголиа ХХК",
    rankLabel: "ТОП-100 #18",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 18,
    sectorIds: ["mining", "research-innovation"],
    website: "https://www.barloworld.mn/",
    mtrlOpportunities: ["Уурхайн тоног төхөөрөмж", "Эд ангийн элэгдэл", "Материалын найдвартай ажиллагаа"],
    cooperationPotential: ["Тоног төхөөрөмжийн материалын судалгаа", "Инженерийн дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "М-Си-Эс Кока-Кола ХХК",
    rankLabel: "ТОП-100 #19",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 19,
    sectorIds: ["laboratory-quality"],
    website: "",
    mtrlOpportunities: ["Сав баглаа боодол", "Полимер материал", "Чанарын хяналт"],
    cooperationPotential: ["Сав баглаа боодлын материалын судалгаа", "QA/QC дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "МоЭнКо ХХК",
    rankLabel: "ТОП-100 #20",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 20,
    sectorIds: ["mining"],
    website: "https://www.moenco.mn/",
    mtrlOpportunities: ["Нүүрс олборлолт", "Нүүрсний чанар", "Уурхайн процесс"],
    cooperationPotential: ["Дадлага", "Нүүрсний шинжилгээ"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Сод Монгол Групп ХХК",
    rankLabel: "ТОП-100 #21",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 21,
    sectorIds: ["energy"],
    website: "https://sodmongolgroup.mn/",
    mtrlOpportunities: ["Шатахуун, тослох материал", "Агуулах сав, хоолойн материал", "Зэврэлт"],
    cooperationPotential: ["Материалын найдвартай ажиллагаа", "Зэврэлт хамгаалал"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Говь ХК",
    rankLabel: "ТОП-100 #23",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 23,
    sectorIds: ["laboratory-quality", "research-innovation"],
    website: "https://www.gobi.mn/",
    mtrlOpportunities: ["Нэхмэл материал", "Материалын шинж чанар", "Чанарын хяналт"],
    cooperationPotential: ["Материалын сорилт", "Шинэ бүтээгдэхүүний судалгаа"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Хүрэн Толгой Коал Майнинг ХХК",
    rankLabel: "ТОП-100 #24",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 24,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Нүүрс олборлолт", "Нүүрсний чанар", "Процесс"],
    cooperationPotential: ["Нүүрсний шинжилгээ", "Дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Болдтөмөр Ерөө Гол ХХК",
    rankLabel: "ТОП-100 #25",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 25,
    sectorIds: ["mining", "metallurgy", "laboratory-quality"],
    website: "https://bteg.mn/",
    mtrlOpportunities: ["Төмрийн хүдэр", "Металлурги", "Механик шинж чанар", "Чанарын хяналт"],
    cooperationPotential: ["Металл материалын судалгаа", "Дадлага", "Дипломын ажил"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Нормаунт ХХК",
    rankLabel: "ТОП-100 #26",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 26,
    sectorIds: ["mining"],
    website: "http://www.normount.mn/",
    mtrlOpportunities: ["Гэрээт уул уурхай", "Хүнд машин механизм", "Эд ангийн элэгдэл"],
    cooperationPotential: ["Уурхайн тоног төхөөрөмжийн материал", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Өсөх зоос ХХК",
    rankLabel: "ТОП-100 #27",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 27,
    sectorIds: ["mining"],
    website: "https://usukhzoos.mn/",
    mtrlOpportunities: ["Нүүрс", "Нүүрсний чанар", "Баяжуулалт"],
    cooperationPotential: ["Дадлага", "Нүүрсний шинжилгээ"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Трансвест Монголиа ХХК",
    rankLabel: "ТОП-100 #29",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 29,
    sectorIds: ["mining", "research-innovation"],
    website: "https://www.transwest.mn/",
    mtrlOpportunities: ["Уурхайн тоног төхөөрөмж", "Эд ангийн материал", "Элэгдэл"],
    cooperationPotential: ["Тоног төхөөрөмжийн материалын судалгаа", "Инженерийн дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Хан Алтай Ресурс ХХК",
    rankLabel: "ТОП-100 #30",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 30,
    sectorIds: ["mining", "laboratory-quality"],
    website: "https://khanaltai.mn/mn/",
    mtrlOpportunities: ["Алтны хүдэр", "Исэлдсэн хүдэр", "Лаборатори", "Процесс"],
    cooperationPotential: ["Дадлага", "Дипломын ажил", "Процессын оновчлол"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Бороо Гоулд ХХК",
    rankLabel: "ТОП-100 #31",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 31,
    sectorIds: ["mining", "laboratory-quality"],
    website: "https://boroo.com/",
    mtrlOpportunities: ["Алтны хүдэр", "Лабораторийн шинжилгээ", "Процессын хяналт"],
    cooperationPotential: ["Дадлага", "Лабораторийн кейс"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Шунхлай Трейдинг ХХК",
    rankLabel: "ТОП-100 #32",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 32,
    sectorIds: ["energy"],
    website: "",
    mtrlOpportunities: ["Шатахуун, тослох материал", "Материалын аюулгүй ажиллагаа"],
    cooperationPotential: ["Зэврэлт хамгаалал", "Материалын найдвартай ажиллагаа"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Айсмарк ХХК / Тэсо Фүүдс",
    rankLabel: "ТОП-100 #33",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 33,
    sectorIds: ["laboratory-quality"],
    website: "https://teso.mn/",
    mtrlOpportunities: ["Сав баглаа боодол", "Хүнсний үйлдвэрийн QA/QC", "Полимер материал"],
    cooperationPotential: ["Чанарын хяналтын дадлага", "Сав баглаа боодлын материал"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Ти Ти Жи Ви Си Өү ХХК",
    rankLabel: "ТОП-100 #34",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 34,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Нүүрс", "Уурхайн процесс", "Чанарын хяналт"],
    cooperationPotential: ["Дадлага", "Нүүрсний шинжилгээ"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Си Өү Эй Эл ХХК",
    rankLabel: "ТОП-100 #36",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 36,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Нүүрс", "Олборлолт", "Нүүрсний чанар"],
    cooperationPotential: ["Нүүрсний лабораторийн кейс", "Дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Баялаг Энержи Ресурс ХХК",
    rankLabel: "ТОП-100 #37",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 37,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Нүүрс", "Уурхайн процесс", "Чанарын хяналт"],
    cooperationPotential: ["Дадлага", "Нүүрсний шинжилгээ"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "МАК Цемент ХХК",
    rankLabel: "ТОП-100 #38",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 38,
    sectorIds: ["construction-materials", "laboratory-quality", "research-innovation"],
    website: "https://www.mak.mn/",
    mtrlOpportunities: ["Цемент", "Клинкер", "Шохойн чулуу", "Барилгын материал", "Чанарын хяналт"],
    cooperationPotential: ["Цементийн лаборатори", "Дипломын ажил", "R&D төсөл"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Рэдпаф Монгол ХХК",
    rankLabel: "ТОП-100 #40",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 40,
    sectorIds: ["mining"],
    website: "https://www.redpathmining.com/",
    mtrlOpportunities: ["Далд уурхай", "Уурхайн бэхэлгээний материал", "Тоног төхөөрөмжийн элэгдэл"],
    cooperationPotential: ["Уурхайн материалын кейс", "Инженерийн дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "МСМ Групп ХХК",
    rankLabel: "ТОП-100 #42",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 42,
    sectorIds: ["research-innovation"],
    website: "https://www.msmgroup.mn/",
    mtrlOpportunities: ["Аж үйлдвэрийн тоног төхөөрөмж", "Материалын найдвартай ажиллагаа", "Инженерийн шийдэл"],
    cooperationPotential: ["Тоног төхөөрөмжийн материал", "Инновацын төсөл"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Тэс Петролиум ХХК",
    rankLabel: "ТОП-100 #44",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 44,
    sectorIds: ["energy"],
    website: "",
    mtrlOpportunities: ["Шатахуун, тослох материал", "Агуулах сав", "Зэврэлт"],
    cooperationPotential: ["Зэврэлт хамгааллын кейс", "Материалын найдвартай ажиллагаа"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Цагаан-Өвөлжөө ХХК",
    rankLabel: "ТОП-100 #47",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 47,
    sectorIds: ["mining"],
    website: "https://www.terraenergy.mn/",
    mtrlOpportunities: ["Коксжих нүүрс", "Нүүрсний чанар", "Уурхайн процесс"],
    cooperationPotential: ["Дадлага", "Нүүрсний материалын судалгаа"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Бодь Интернэшнл ХХК",
    rankLabel: "ТОП-100 #48",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 48,
    sectorIds: ["construction-materials"],
    website: "https://bodi.mn/",
    mtrlOpportunities: ["Дэд бүтэц", "Барилгын материал", "Инженерийн чанарын хяналт"],
    cooperationPotential: ["Барилгын материалын кейс", "Инженерийн дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Петростар ХХК",
    rankLabel: "ТОП-100 #51",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 51,
    sectorIds: ["energy"],
    website: "",
    mtrlOpportunities: ["Шатахуун, тослох материал", "Агуулах савны материал", "Зэврэлт"],
    cooperationPotential: ["Материалын найдвартай ажиллагаа", "Зэврэлт хамгаалал"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Шинь Шинь ХХК",
    rankLabel: "ТОП-100 #52",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 52,
    sectorIds: ["mining", "metallurgy", "laboratory-quality"],
    website: "",
    mtrlOpportunities: ["Өнгөт металл", "Баяжмал", "Хүдрийн шинжилгээ", "Металлурги"],
    cooperationPotential: ["Металл материалын судалгаа", "Лабораторийн дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Мапа Иншаат вэ Тижарет ХХК",
    rankLabel: "ТОП-100 #53",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 53,
    sectorIds: ["construction-materials"],
    website: "",
    mtrlOpportunities: ["Барилга, дэд бүтэц", "Барилгын материалын чанарын хяналт"],
    cooperationPotential: ["Барилгын материалын кейс", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Талх Чихэр ХК",
    rankLabel: "ТОП-100 #55",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 55,
    sectorIds: ["laboratory-quality"],
    website: "https://www.talkh-chikher.mn/",
    mtrlOpportunities: ["Сав баглаа боодол", "QA/QC", "Полимер материал"],
    cooperationPotential: ["Чанарын хяналтын дадлага", "Сав баглаа боодлын материал"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Сүү ХК",
    rankLabel: "ТОП-100 #56",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 56,
    sectorIds: ["laboratory-quality"],
    website: "https://www.suu.mn/",
    mtrlOpportunities: ["Сав баглаа боодол", "Хүнсний үйлдвэрийн QA/QC", "Лаборатори"],
    cooperationPotential: ["Чанарын хяналтын дадлага", "Сав баглаа боодлын материал"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "М-Си-Эс Интернэйшнл ХХК",
    rankLabel: "ТОП-100 #57",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 57,
    sectorIds: ["research-innovation"],
    website: "https://mcsinternational.mn/",
    mtrlOpportunities: ["Инженерчлэл", "Эрчим хүчний систем", "Дэд бүтцийн технологи"],
    cooperationPotential: ["Инженерийн төсөл", "R&D хамтын ажиллагаа"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Бьюлдинг Мэйнтэнэнс Сервисэс ХХК",
    rankLabel: "ТОП-100 #60",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 60,
    sectorIds: ["construction-materials"],
    website: "",
    mtrlOpportunities: ["Барилгын ашиглалт", "Материалын элэгдэл", "Засвар үйлчилгээ"],
    cooperationPotential: ["Барилгын материалын найдвартай ажиллагаа", "Дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Петро Хаан ХХК",
    rankLabel: "ТОП-100 #62",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 62,
    sectorIds: ["energy"],
    website: "",
    mtrlOpportunities: ["Шатахуун, тослох материал", "Зэврэлт", "Агуулах савны материал"],
    cooperationPotential: ["Материалын аюулгүй ажиллагаа", "Зэврэлт хамгаалал"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Цайрт Минерал ХХК",
    rankLabel: "ТОП-100 #63",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 63,
    sectorIds: ["mining", "metallurgy", "laboratory-quality"],
    website: "https://www.tsairt.mn/",
    mtrlOpportunities: ["Цайрын хүдэр", "Баяжмал", "Металлурги", "Лабораторийн шинжилгээ"],
    cooperationPotential: ["Дадлага", "Баяжмалын чанарын судалгаа"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Спирт Бал Бурам ХХК",
    rankLabel: "ТОП-100 #65",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 65,
    sectorIds: ["laboratory-quality"],
    website: "",
    mtrlOpportunities: ["Сав баглаа боодол", "QA/QC", "Үйлдвэрийн лаборатори"],
    cooperationPotential: ["Чанарын хяналтын дадлага", "Сав баглаа боодлын материал"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "НБИК ХХК",
    rankLabel: "ТОП-100 #67",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 67,
    sectorIds: ["construction-materials"],
    website: "https://www.nbik.mn/",
    mtrlOpportunities: ["Барилга", "Барилгын материал", "Чанарын хяналт"],
    cooperationPotential: ["Барилгын материалын кейс", "Инженерийн дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Алтайн Зам ХК",
    rankLabel: "ТОП-100 #68",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 68,
    sectorIds: ["construction-materials"],
    website: "",
    mtrlOpportunities: ["Замын материал", "Асфальт, бетон", "Чанарын хяналт"],
    cooperationPotential: ["Замын материалын сорилт", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Кэй Эй Майнинг ХХК",
    rankLabel: "ТОП-100 #70",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 70,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Уул уурхай", "Олборлолт", "Уурхайн процесс"],
    cooperationPotential: ["Дадлага", "Уурхайн материалын кейс"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Монос Улаанбаатар ХХК",
    rankLabel: "ТОП-100 #71",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 71,
    sectorIds: ["laboratory-quality", "research-innovation"],
    website: "https://monos.mn/",
    mtrlOpportunities: ["Эмийн сав баглаа боодол", "Лаборатори", "Чанарын хяналт"],
    cooperationPotential: ["Лабораторийн дадлага", "Сав баглаа боодлын материал"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Хур Эрдэнэ Баялаг ХХК",
    rankLabel: "ТОП-100 #73",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 73,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Уул уурхай", "Эрдэс баялаг", "Процесс"],
    cooperationPotential: ["Дадлага", "Материалын шинжилгээ"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Вертекс Майнинг Партнер ХХК",
    rankLabel: "ТОП-100 #75",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 75,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Уул уурхайн үйлчилгээ", "Техник тоног төхөөрөмж", "Элэгдэл"],
    cooperationPotential: ["Уурхайн тоног төхөөрөмжийн материал", "Дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Интернэйшнл Медикал Сентер ХХК",
    rankLabel: "ТОП-100 #76",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 76,
    sectorIds: ["laboratory-quality"],
    website: "https://www.intermed.mn/",
    mtrlOpportunities: ["Био-материал", "Эмнэлгийн хэрэгслийн материал", "Лаборатори"],
    cooperationPotential: ["Био материалын судалгаа", "Лабораторийн дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Шарын Гол ХК",
    rankLabel: "ТОП-100 #79",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 79,
    sectorIds: ["mining"],
    website: "https://www.sharyngol.mn/",
    mtrlOpportunities: ["Нүүрс", "Нүүрсний чанар", "Уурхайн процесс"],
    cooperationPotential: ["Нүүрсний шинжилгээ", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Платинум Ланд ХХК",
    rankLabel: "ТОП-100 #80",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 80,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Уул уурхай", "Процесс", "Материалын шинжилгээ"],
    cooperationPotential: ["Дадлага", "Процессын кейс"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Эпирок Монголиа ХХК",
    rankLabel: "ТОП-100 #81",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 81,
    sectorIds: ["mining", "research-innovation"],
    website: "https://www.epiroc.com/en-mn",
    mtrlOpportunities: ["Уурхайн тоног төхөөрөмж", "Өрөмдлөг", "Эд ангийн материал", "Элэгдэл"],
    cooperationPotential: ["Тоног төхөөрөмжийн материалын судалгаа", "Инженерийн дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Спейшл Майнинг Сервис ХХК",
    rankLabel: "ТОП-100 #82",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 82,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Уул уурхайн үйлчилгээ", "Тэсэлгээ, процесс", "Материалын аюулгүй ажиллагаа"],
    cooperationPotential: ["Уурхайн үйлчилгээний кейс", "Дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Хишиг-Арвин Индустриал ХХК",
    rankLabel: "ТОП-100 #83",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 83,
    sectorIds: ["mining"],
    website: "https://khishigarvin.mn/",
    mtrlOpportunities: ["Уул уурхайн гэрээт үйлчилгээ", "Тоног төхөөрөмж", "Элэгдэл"],
    cooperationPotential: ["Тоног төхөөрөмжийн материал", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "АПУ Дэйри ХХК",
    rankLabel: "ТОП-100 #85",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 85,
    sectorIds: ["laboratory-quality"],
    website: "",
    mtrlOpportunities: ["Сав баглаа боодол", "Хүнсний үйлдвэрийн QA/QC", "Лаборатори"],
    cooperationPotential: ["Сав баглаа боодлын материал", "Чанарын хяналтын дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Мэйжор Дриллинг Монгол ХХК",
    rankLabel: "ТОП-100 #86",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 86,
    sectorIds: ["mining"],
    website: "https://www.majordrilling.com/",
    mtrlOpportunities: ["Өрөмдлөг", "Хайгуул", "Өрмийн материалын элэгдэл"],
    cooperationPotential: ["Өрөмдлөгийн материалын кейс", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Моносфарм Трейд ХХК",
    rankLabel: "ТОП-100 #87",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 87,
    sectorIds: ["laboratory-quality", "research-innovation"],
    website: "https://monospharma.mn/",
    mtrlOpportunities: ["Эмийн сав баглаа боодол", "Лаборатори", "Чанарын хяналт"],
    cooperationPotential: ["Лабораторийн дадлага", "Сав баглаа боодлын материал"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Тийсс Монгол ХХК",
    rankLabel: "ТОП-100 #91",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 91,
    sectorIds: ["mining"],
    website: "https://www.thiess.com/",
    mtrlOpportunities: ["Гэрээт уул уурхай", "Хүнд машин механизм", "Элэгдэл"],
    cooperationPotential: ["Уурхайн тоног төхөөрөмжийн материал", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Баян Айраг Эксплорэйшн ХХК",
    rankLabel: "ТОП-100 #92",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 92,
    sectorIds: ["mining", "laboratory-quality"],
    website: "https://www.bayan-airag.com/",
    mtrlOpportunities: ["Алт, мөнгө", "Хүдрийн шинжилгээ", "Лаборатори"],
    cooperationPotential: ["Лабораторийн кейс", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Монсуль ХХК",
    rankLabel: "ТОП-100 #94",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 94,
    sectorIds: ["energy"],
    website: "",
    mtrlOpportunities: ["Шатахуун, тослох материал", "Сав, хоолойн материал", "Зэврэлт"],
    cooperationPotential: ["Зэврэлт хамгаалал", "Материалын найдвартай ажиллагаа"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Таван Богд Солюшнс ХХК",
    rankLabel: "ТОП-100 #95",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 95,
    sectorIds: ["research-innovation"],
    website: "",
    mtrlOpportunities: ["Дижитал шийдэл", "AI, өгөгдөл", "Инженерийн систем"],
    cooperationPotential: ["AI ашигласан материалын өгөгдлийн төсөл", "Дижитал лабораторийн шийдэл"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Алтан Тариа ХХК",
    rankLabel: "ТОП-100 #97",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 97,
    sectorIds: ["laboratory-quality"],
    website: "",
    mtrlOpportunities: ["Сав баглаа боодол", "Хүнсний үйлдвэрийн QA/QC", "Лаборатори"],
    cooperationPotential: ["Чанарын хяналтын дадлага", "Сав баглаа боодлын материал"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Волтам ХХК",
    rankLabel: "ТОП-100 #98",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 98,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Уул уурхайн үйлчилгээ", "Материалын аюулгүй ажиллагаа", "Процесс"],
    cooperationPotential: ["Уурхайн үйлчилгээний кейс", "Дадлага"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  },
  {
    name: "Сэндвик Монголиа ХХК",
    rankLabel: "ТОП-100 #100",
    listType: "Хувийн хэвшлийн ТОП-100",
    top100Rank: 100,
    sectorIds: ["mining", "research-innovation"],
    website: "https://www.rocktechnology.sandvik/",
    mtrlOpportunities: ["Уурхайн тоног төхөөрөмж", "Эд ангийн материал", "Элэгдэл, найдвартай ажиллагаа"],
    cooperationPotential: ["Тоног төхөөрөмжийн материалын судалгаа", "Инженерийн дадлага"],
    status: "Стратегийн ажил олгогч"
  },

  {
    name: "Эрдэнэс Тавантолгой ХК",
    rankLabel: "Төрийн ТОП-10 #1",
    listType: "Төрийн өмчит ТОП-10",
    stateRank: 1,
    sectorIds: ["mining", "laboratory-quality"],
    website: "https://www.ett.mn/",
    mtrlOpportunities: ["Нүүрс", "Нүүрсний чанар", "Баяжуулалт", "Лаборатори"],
    cooperationPotential: ["Дадлага", "Дипломын ажил", "Нүүрсний шинжилгээний төсөл"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Эрдэнэт үйлдвэр ТӨҮГ",
    rankLabel: "Төрийн ТОП-10 #2",
    listType: "Төрийн өмчит ТОП-10",
    stateRank: 2,
    sectorIds: ["mining", "metallurgy", "laboratory-quality", "research-innovation"],
    website: "https://www.erdenetmc.mn/",
    mtrlOpportunities: ["Зэс-молибдены хүдэр", "Баяжуулалт", "Металлурги", "Лаборатори", "Зэврэлт, элэгдэл"],
    cooperationPotential: ["Хамтарсан судалгаа", "Дадлага", "Дипломын ажил", "Үйлдвэрийн кейс төсөл"],
    status: "Хамтын алагааны суурьтай"
  },
  {
    name: "Эрдэнэс Монгол ХХК",
    rankLabel: "Төрийн ТОП-10 #3",
    listType: "Төрийн өмчит ТОП-10",
    stateRank: 3,
    sectorIds: ["mining", "research-innovation"],
    website: "https://erdenesmongol.mn/",
    mtrlOpportunities: ["Эрдэс баялгийн төслүүд", "Стратегийн минерал", "Технологийн бодлого"],
    cooperationPotential: ["Салбарын судалгаа", "Ажил олгогчийн зөвлөл", "R&D төсөл"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Тавантолгой ХК",
    rankLabel: "Төрийн ТОП-10 #5",
    listType: "Төрийн өмчит ТОП-10",
    stateRank: 5,
    sectorIds: ["mining"],
    website: "",
    mtrlOpportunities: ["Нүүрс", "Нүүрсний чанар", "Уурхайн процесс"],
    cooperationPotential: ["Дадлага", "Нүүрсний шинжилгээ"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "УБЦТС ТӨХК",
    rankLabel: "Төрийн ТОП-10 #8",
    listType: "Төрийн өмчит ТОП-10",
    stateRank: 8,
    sectorIds: ["energy"],
    website: "https://www.ubedn.mn/",
    mtrlOpportunities: ["Цахилгаан түгээх сүлжээ", "Кабель, тусгаарлагч материал", "Зэврэлт, найдвартай ажиллагаа"],
    cooperationPotential: ["Эрчим хүчний материалын судалгаа", "Дадлага"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Дулааны 4 дүгээр цахилгаан станц ТӨХК",
    rankLabel: "Төрийн ТОП-10 #9",
    listType: "Төрийн өмчит ТОП-10",
    stateRank: 9,
    sectorIds: ["energy", "laboratory-quality", "research-innovation"],
    website: "https://www.tpp4.mn/",
    mtrlOpportunities: ["Өндөр температурын материал", "Зуух, турбин, хоолойн зэврэлт", "Үнсэн материал", "Дулаан тэсвэртэй материал"],
    cooperationPotential: ["Эрчим хүчний материалын R&D", "Зэврэлт, элэгдлийн судалгаа", "Үнсэн хаягдлын ашиглалт"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Эрдэнэс критикал минералс ТӨҮГ",
    rankLabel: "Төрийн ТОП-10 #10",
    listType: "Төрийн өмчит ТОП-10",
    stateRank: 10,
    sectorIds: ["mining", "metallurgy", "laboratory-quality", "research-innovation"],
    website: "https://www.ecmm.mn/",
    mtrlOpportunities: ["Критикал минерал", "Жонш", "Төмрийн хүдэр", "Газрын ховор элемент", "Материалын шинжилгээ"],
    cooperationPotential: ["Критикал минералын судалгаа", "Дадлага", "Дипломын ажил", "R&D төсөл"],
    status: "Стратегийн ажил олгогч"
  },
  {
    name: "Цемент Шохой ХХК",
    rankLabel: "Стратегийн байгууллага",
    listType: "2024 ТОП-100-д баталгаажаагүй",
    top100Rank: null,
    sectorIds: ["construction-materials", "laboratory-quality", "research-innovation"],
    website: "https://khutulcement.mn/",
    mtrlOpportunities: ["Цемент", "Клинкер", "Шохойн чулуу", "Барилгын материалын сорилт"],
    cooperationPotential: ["Цементийн материалын судалгаа", "Клинкерийн судалгаа", "Дадлага", "R&D төсөл"],
    status: "Хамтын ажиллагааг хөгжүүлэх боломжтой"
  }
];

const getOrganizationsBySector = (sectorId) => {
  return organizations.filter(org => org.sectorIds.includes(sectorId));
};

// State management
let currentView = 'overview';
let activeSectorId = null;

function renderOverview() {
  const container = document.getElementById('hub_content');
  container.innerHTML = `
    <div class="career-hero">
      <div class="container career-intro">
        <nav class="breadcrumb">
          <a href="index.html">Нүүр</a>
          <span>/</span>
          <span style="color: var(--primary-blue); font-weight: 600;">Ажил мэргэжил</span>
        </nav>
        <h2>Монголын тэргүүлэх аж ахуйн нэгжүүдэд ажиллах боломж</h2>
        <p>Материал судлал, инженерчлэлийн төгсөгчид уул уурхай, эрдэс боловсруулалт, металлурги, барилгын материал, эрчим хүч, лаборатори, чанарын хяналт, R&D чиглэлээр ажиллах боломжтой.</p>
      </div>
    </div>

    <div class="container" style="padding: 40px 0;">
      <div class="chart-container">
        <h3 class="chart-title">Салбар тус бүрийн боломжийн түвшин</h3>
        <canvas id="opportunityChart"></canvas>
      </div>

      <div class="hub-controls">
        <div class="search-input-group">
          <i data-lucide="search"></i>
          <input type="text" id="main_search" placeholder="Байгууллага, салбар, ажлын байр хайх..." oninput="handleSearch(this.value)">
        </div>
        <select class="filter-select" id="sector_filter" onchange="filterByCategory(this.value)">
          <option value="all">Бүх салбар</option>
          ${sectors.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
        </select>
      </div>

      <div class="sector-grid" id="sector_list">
        ${renderSectorCards(sectors)}
      </div>

      <div id="search_results" style="display:none; margin-top: 30px;">
        <h3 style="margin-bottom: 20px; font-size: 1.2rem;">Хайлтын үр дүн:</h3>
        <div class="company-grid" id="filtered_companies"></div>
      </div>
      
      <div class="footer-note" style="margin-top: 60px; padding: 30px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; font-size: 0.85rem; color: #64748b; line-height: 1.6;">
        <i data-lucide="info" style="width: 16px; margin-bottom: 10px; color: var(--primary-blue);"></i>
        <p>Байгууллагуудын эрэмбэ нь 2024 оны ТОП-100 хувийн хэвшлийн аж ахуйн нэгж болон 2024 оны төрийн өмчит ТОП-10 аж ахуйн нэгжийн нийтэд зарласан мэдээлэлд үндэслэв. Нэг байгууллага олон салбарт давхар харагдаж болно. Албан хамтын ажиллагааны статусыг МУИС/ИТС-ийн баталгаажсан гэрээ, санамж бичиг, албан мэдээллээр шинэчилнэ.</p>
      </div>
    </div>
  `;
  lucide.createIcons();
  initChart();
}

function renderSectorCards(sectorsList) {
  return sectorsList.map(s => {
    const count = getOrganizationsBySector(s.id).length;
    return `
      <div class="sector-card" onclick="openSector('${s.id}')">
        <div class="icon-box"><i data-lucide="${s.icon}"></i></div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <div class="sector-stats">
          <span class="stat-item">Байгууллага <span class="stat-val">${count}</span></span>
          <div class="card-btn" style="padding: 5px 12px; font-size: 0.75rem;">Үзэх</div>
        </div>
      </div>
    `;
  }).join('');
}

function openSector(sectorId) {
  const sector = sectors.find(s => s.id === sectorId);
  if (!sector) return;

  const sectorOrgs = getOrganizationsBySector(sectorId).sort((a, b) => {
    // Sort by TOP-100 rank if available
    if (a.top100Rank !== null && b.top100Rank !== null) return a.top100Rank - b.top100Rank;
    if (a.top100Rank !== null) return -1;
    if (b.top100Rank !== null) return 1;
    
    // Then by State rank
    if (a.stateRank !== undefined && b.stateRank !== undefined) return a.stateRank - b.stateRank;
    if (a.stateRank !== undefined) return -1;
    if (b.stateRank !== undefined) return 1;
    
    return 0;
  });

  const container = document.getElementById('hub_content');
  container.innerHTML = `
    <div class="career-hero" style="padding: 40px 0;">
      <div class="container">
        <nav class="breadcrumb">
          <a href="#" onclick="renderOverview()">Нүүр</a>
          <span>/</span>
          <a href="#" onclick="renderOverview()">Ажил мэргэжил</a>
          <span>/</span>
          <span style="color: var(--primary-blue); font-weight: 600;">${sector.title}</span>
        </nav>
        <div class="back-btn" onclick="renderOverview()">
          <i data-lucide="arrow-left" style="width:18px;"></i> Буцах
        </div>
        <div style="display:flex; align-items:center; gap:20px; margin-bottom: 20px;">
          <div class="icon-box" style="width:60px; height:60px; background:#eff6ff; border-radius:15px; display:flex; align-items:center; justify-content:center; color:var(--primary-blue);">
            <i data-lucide="${sector.icon}" style="width:30px; height:30px;"></i>
          </div>
          <div>
            <h2 style="margin:0; font-size:2rem; font-weight:800;">${sector.title}</h2>
            <p style="margin:5px 0 0; color:var(--text-muted);">${sector.description}</p>
          </div>
        </div>
        <div class="detail-header-note" style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px 20px; border-radius: 8px; font-size: 0.9rem; color: #92400e; margin-bottom: 20px;">
          Энэ жагсаалт нь MTRL төгсөгчдийн ажиллах боломж, дадлага, дипломын ажил, хамтарсан судалгаа, лабораторийн чиглэлийг харуулах зорилготой. Байгууллагын албан хамтын ажиллагааны статусыг баталгаажсан эх сурвалжаар үе шаттай шинэчилнэ.
        </div>
      </div>
    </div>

    <div class="container" style="padding: 40px 0;">
      <div class="detail-layout active-view">
        <div class="company-grid" id="sector_companies">
          ${renderCompanies(sectorOrgs)}
        </div>
      </div>
      
      <div style="margin-top: 60px; padding: 30px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; font-size: 0.85rem; color: #64748b; text-align: center;">
        Байгууллагуудын эрэмбэ нь 2024 оны ТОП-100 хувийн хэвшлийн аж ахуйн нэгж болон 2024 оны төрийн өмчит ТОП-10 аж ахуйн нэгжийн нийтэд зарласан мэдээлэлд үндэслэв. Албан хамтын ажиллагааны статусыг МУИС/ИТС-ийн баталгаажсан мэдээлэл, гэрээ, санамж бичигт үндэслэн шинэчилнэ.
      </div>
    </div>
  `;
  lucide.createIcons();
  window.scrollTo(0, 0);
}

function renderCompanies(companiesList) {
  return companiesList.map(c => `
    <div class="company-card">
      <div class="company-header">
        <div>
          <div class="company-name">${c.name}</div>
          <div class="rank-badge">${c.rankLabel}</div>
          <div class="list-type" style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">${c.listType}</div>
        </div>
        <div class="status-badge ${c.status === 'Стратегийн ажил олгогч' || c.status === 'Хамтын ажиллагааны суурьтай' || c.status === 'Стратегийн байгууллага' ? 'primary' : 'potential'}">
          ${c.status}
        </div>
      </div>
      
      <div class="org-section">
        <div class="section-label">MTRL Боломжууд:</div>
        <div class="tag-cloud">
          ${c.mtrlOpportunities.map(o => `<span class="op-tag">${o}</span>`).join('')}
        </div>
      </div>

      <div class="org-section">
        <div class="section-label">Хамтын ажиллагаа:</div>
        <div class="tag-cloud">
          ${c.cooperationPotential.map(p => `<span class="co-tag">${p}</span>`).join('')}
        </div>
      </div>

      <div style="margin-top: 20px;">
        ${c.website ? `
          <a href="${c.website}" target="_blank" class="card-btn">
            Веб сайт руу очих <i data-lucide="external-link" style="width:14px;"></i>
          </a>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function handleSearch(query) {
  const resultContainer = document.getElementById('search_results');
  const sectorList = document.getElementById('sector_list');
  const filteredGrid = document.getElementById('filtered_companies');
  
  if (!query) {
    resultContainer.style.display = 'none';
    sectorList.style.display = 'grid';
    return;
  }

  const results = organizations.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.rankLabel.toLowerCase().includes(query.toLowerCase()) ||
    c.listType.toLowerCase().includes(query.toLowerCase()) ||
    c.mtrlOpportunities.some(o => o.toLowerCase().includes(query.toLowerCase())) ||
    c.cooperationPotential.some(p => p.toLowerCase().includes(query.toLowerCase()))
  );

  resultContainer.style.display = 'block';
  sectorList.style.display = 'none';
  filteredGrid.innerHTML = results.length > 0 ? renderCompanies(results) : '<p style="padding: 40px; text-align: center; color: var(--text-muted); grid-column: span 2;">Илэрц олдсонгүй.</p>';
  lucide.createIcons();
}

function filterByCategory(sectorId) {
  if (sectorId === 'all') {
    renderOverview();
  } else {
    openSector(sectorId);
  }
}

function initChart() {
  const ctx = document.getElementById('opportunityChart');
  if (!ctx) return;

  const data = [
    { label: 'Уул уурхай', value: 95, id: 'mining' },
    { label: 'Металлурги', value: 85, id: 'metallurgy' },
    { label: 'Барилгын материал', value: 80, id: 'construction-materials' },
    { label: 'Лаборатори', value: 80, id: 'laboratory-quality' },
    { label: 'Эрчим хүч', value: 70, id: 'energy' },
    { label: 'R&D Инноваци', value: 65, id: 'research-innovation' }
  ];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        label: 'Боломжийн түвшин (%)',
        data: data.map(d => d.value),
        backgroundColor: '#1d4ed8',
        borderRadius: 8,
        barThickness: 30
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, max: 100 },
        x: { grid: { display: false } }
      },
      onClick: (e, items) => {
        if (items.length > 0) {
          const index = items[0].index;
          openSector(data[index].id);
        }
      }
    }
  });
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
  renderOverview();
});
