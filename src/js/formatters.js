class Formatters
{
    static formatStringFromTimestamp(date)
    {
        let dateSplit1 = date.split('T');
        let dateSplit2 = dateSplit1[0].split('-');
        let dateSplit3 = dateSplit1[1].split(':');

        let formattedDate = 
            dateSplit2[2] + '/' + dateSplit2[1] + '/' + dateSplit2[0]
            + ' ' + dateSplit3[0] + ':' + dateSplit3[1];

        return formattedDate;
    }
}

export default Formatters;