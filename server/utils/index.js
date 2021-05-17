module.exports = {

    destructureDate: (dateString) => {

        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = date.getMonth() + 1 //month is zero based
        const day = date.getDate()
        return {year, month, day}
    }
}