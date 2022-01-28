export default
    function getISO(data) {
        const d = new Date(data)
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
       //console.log(d.toISOString())
        return d.toISOString().split('T')[0]
    }