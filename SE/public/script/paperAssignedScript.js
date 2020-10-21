$(()=>{
    $.post('/reviewer/papersAssignedData',
    function(req,res) {
        // console.log(req[0])
        let app;
        
        for(let i in req) {
            console.log(req[i])
            let row = $('<div/>');
            let data = "<h3>" + req[i].topic + "</h5>"
            row.append(data)
            data = "<p> Category: " + req[i].category + "</p>"
            row.append(data)
            data = "<p> Dated: " + req[i].date + "</p>"
            row.append(data)
            data = "<p> RevieweeId: " + req[i].revieweeId + "</p>"
            row.append(data)
            data = "<p> Status: " + req[i].selected + "</p>"
            row.append(data)
            
            data = "<form action='/reviewer/plag' method='POST'> <input type='hidden' name='paperId' value= '" + req[i].paperId + "'> <input type='hidden' name='revieweeId' value= '" + req[i].revieweeId + "'> <button> Check Plagiarism </button> </form>"
            row.append(data)

            data = "<form action='/reviewer/accept' method='POST'> <input type='hidden' name='paperId' value= '" + req[i].paperId + "'> <input type='hidden' name='revieweeId' value= '" + req[i].revieweeId + "'> <button> Accept </button> </form>"
            row.append(data)

            data = "<form action='/reviewer/reject' method='POST'> <input type='hidden' name='paperId' value= '" + req[i].paperId + "'> <input type='hidden' name='revieweeId' value= '" + req[i].revieweeId + "'> <button> Reject </button> </form>"
            row.append(data)
            $('#addHere').append(row)
        }
        // $('#addHere').append(app)
        // console.log('helloooooooooo')
    })
})