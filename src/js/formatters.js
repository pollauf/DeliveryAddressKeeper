class Formatters
{
    static formatStringFromTimestamp(date, convertFromUTC = true)
    {
        let dateSplit1 = date.split('T');
        let dateSplit2 = dateSplit1[0].split('-');
        let dateSplit3 = dateSplit1[1].split(':');

        if (convertFromUTC)
        {
            let dateUTC = 
                new Date(Date.UTC(dateSplit2[0], dateSplit2[1], dateSplit2[2], dateSplit3[0], dateSplit3[1], 0));

            let dateSP = new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric',
                hour12: false,
                timeZone: "America/Sao_Paulo"
            });

            dateSP = dateSP.format(dateUTC);

            return dateSP;
        }

        let formattedDate = 
            dateSplit2[2] + '/' + dateSplit2[1] + '/' + dateSplit2[0]
            + ' ' + dateSplit3[0] + ':' + dateSplit3[1];

        return formattedDate;
    }
}

export default Formatters;