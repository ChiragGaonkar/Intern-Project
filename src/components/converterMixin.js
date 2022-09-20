import {date} from 'quasar'
const converterMixin = {
  methods:{
    convertData(converterConfig,key){
      switch(converterConfig.Type){
        case "Text":
          return this.TextConverter(converterConfig, key);
        case "Date":
          return this.DateConverter(converterConfig, key);

      }
    },

    TextConverter(converterConfig, key){
      var convertedValue = ""
      const found = converterConfig.Options.find(element => element.value == key);
      if(found){
        convertedValue = found.label
      }
      return convertedValue
    },

    DateConverter(converterConfig, key){
      var formattedDate = ''
      var dateObj = new Date(key)
      var dateFormat = 'DD-MM-YYYY'
      if(converterConfig.hasOwnProperty('Format')){
        dateFormat = converterConfig.Format
      }
      if (dateObj == 'Invalid Date') {
        return formattedDate
      }
      formattedDate = date.formatDate(dateObj, dateFormat)
      return formattedDate
    }
  }
}

export default converterMixin