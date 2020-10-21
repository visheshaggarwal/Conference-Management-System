$(()=>{
    $.post('/attendee/attendeePageData',
    function(req,res) {
        // console.log(req[0])
        let app;
        
        for(let i in req) {
            console.log(req[i])
            let row = $('<tr/>');
            let data = "<td>" + req[i].venue + "</td>"
            row.append(data)
            data = "<td>" + req[i].category + "</td>"
            row.append(data)
            data = "<td>" + req[i].date + "</td>"
            row.append(data)
            data = "<td>" + req[i].startTime + "</td>"
            row.append(data)
            data = "<td>" + req[i].duration + "</td>"
            row.append(data)
            // row.append(
            //     $('<td/>',{
            //         val: req[i].category
            //     })
            // )
            // console.log(row)
            // row = $('<tr\>',{
            //     val: row,
            //     // id: 
            // })
            $('#addHere').append(row)
        }
        // $('#addHere').append(app)
        // console.log('helloooooooooo')
    })
})