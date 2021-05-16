import axios from 'axios';
const API_ROUTE = '/api'

export const getSemester = async () => {

    try {
        const semesters = (await axios.get(`${API_ROUTE}/semester`)).data
        console.log(semesters)

        return semesters

    } catch (error) {
        alert(error)
    }

}