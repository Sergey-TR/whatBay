export default
    function noteDays(arr) {
        let note = [];
       //  arr.forEach(function (item) {
       //      //console.log(item)
       //      item.list.forEach(function (l) {
       //          console.log(typeof l.day)
       //          note.push(l.day)
       //      })
       //  })
       //  console.log(note)
       //  let noteDays = note.filter((item, idx) => {
       //   return  note.indexOf(item) === idx
       // })
       //  console.log(noteDays)
       //  return noteDays

       // console.log(arr)

        arr.forEach(function (item) {
           note.push(item.created_at)
        })
        // console.log(note)
         let noteDays = note.filter((item, idx) => {
          return  note.indexOf(item) === idx
        })
        // console.log(noteDays)
        return noteDays
    }