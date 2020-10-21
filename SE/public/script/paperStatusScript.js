$(()=>{
    $.post('/reviewee/paperStatusData',
    function(req,res) {
        // console.log(req[0])
        let app;
        
        for(let i in req) {
            console.log(req[i])
            let row = $('<div/>');
            let data = "<h3>" + req[i].topic + "</h5>"
            row.append(data)
            row.append("<ul>")
            data = "<li> Category: " + req[i].category + "</li>"
            row.append(data)
            data = "<li> Dated: " + req[i].date + "</li>"
            row.append(data)
            data = "<li> ReviewerId: " + req[i].reviewerId + "</li>"
            row.append(data)
            data = "<li> Status: " + req[i].selected + "</li>"
            row.append(data)
            row.append("</ul>")
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