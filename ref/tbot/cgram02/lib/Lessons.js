// global scope

let app = getApp()

const GRAM_SET_DATA = [

  {
    title: {
      en: "test set",
      cn: "test set",
      pn: "test set"
    },
    cname: "test-set",
    items: [
      "yihou",
      "yijing",
      "yilai",
      "ranhou"
    ]
  },

  {
    title: {
      en: "time related",
      cn: "的时候～"
    },
    cname: "time-related",
    items: [
      "yihou",
      "yijing",
      "yilai",
      "yiqian",
      "yizhi",
      "ranhou",
      "guo",
      "guo-le",
      "gangcai",
      "zai-ing"
    ]
  },

  {
    title: {
      en: "frequency",
      cn: "频率 pín lǜ"
    },
    cname: "frequency",
    items: [
      "yizhi",
      "jingchang",
      "tongchang",
      "youshi",
      "ouer",
      "henshao",
      "congbu"
    ]
  },

  {
    cname: "conditions",
    title: {
      en: "conditions",
      cn: "如果～"
    },
    items: [
      "ruguo-jiu",
      "suiran-danshi",
      "yingai",
      "keyi"
    ]
  },

  {
    cname: "basic-tenses",
    title: {
      en: "basic tenses",
      cn: "tenses",
      pn: "tenses"
    },
    items: [
      "zai-ing",
      "guo-le",
      "de-shihou"
    ]
  },

   {
     cname: "me-items",
     title: {
       en: "items with me subject",
     },
     items: [
       "yaowoshuo",
       "gengxihuan",
       "rangwomenqidai",
       "woxiai",
       "woyijing-le",
       "woyizhizai",
       "wotaoyan",
       "wobuzaihu",
       "wobuxihuan",
       "wochaoxihuan"
     ]
   },

   {
     cname: "consequence-items",
     title: {
       en: "consequence items",
       cn: "consequence ",
       pn: "..."
     },
     items: [
       "zhiyaojiu",
       "zheyang",
       "zaishuo",
       "yulaiyue",
       "yue-yue",
       "you-you",
       "you-ma",
       "yinwei-suoyi",
       "yinwei",
       "yijing-le",
       "yidan-jiu",
       "yibian-yibian",
       "yi-yebu",
       "yi-jiu",
       "xian-zai"
     ]
   }
  ]

let Lessons = {

  findByCname: (cname) => {
    //  - use Array.filter to find a matching item
    // note that returns an array, so just pick the first elem
    // return first item in Array//return [0]
    let gsets = GRAM_SET_DATA.filter( gset => {
      return (gset.cname === cname)
    })
    let found = gsets[0]
    console.log("found", found)
    return found
  },

  sample: () => {
    return GRAM_SET_DATA[0]
  },

  all: () => {
    // skip the test lesson
    return GRAM_SET_DATA.slice(1, GRAM_SET_DATA.length)
  }

}

module.exports = Lessons
