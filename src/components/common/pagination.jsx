const pagination = (c, total) => {
    
    let pageNumber=[];
    if (total <= 8) {
        for (let i = 1; i <= total; i++) {
            console.log(`${i} `);
            pageNumber.push(i);
        }
    }

    else if (c === total) {
        console.log(`1,2,..${c - 2},${c - 1},${c}`);
        pageNumber.push(1,2,'...',c-2,c-1,c);

    }

    else if (total - c === 1) {
        console.log(`1,2,..${c - 2},${c - 1},${c},${c + 1}`);
        pageNumber.push(1,2,'...',c-2,c-1,c,c+1);
    }

    else if (total - c === 2) {
        console.log(`1,2,..${c - 2},${c - 1},${c},${c + 1},${c + 2}`);
        pageNumber.push(1,2,'...',c-2,c-1,c,c+1,c+2);
    }
    else if (total - c === 3) {
        console.log(`1,2,..${c - 2},${c - 1},${c},${c + 1},${c + 2},${total}`);
        pageNumber.push(1,2,'...',c-2,c-1,c,c+1,c+2,total);
    }

    else if (total - c > 3) {
        if (c <= 5) {
            for (let i = 1; i < c; i++) {
                console.log(`${i} `);
                pageNumber.push(i);
            }
            console.log(`${c},${c + 1},${c + 2},...${total}`);
            pageNumber.push(c,c+1,c+2,'...',total);
        }
        else{
            console.log(`1,2,..${c - 2},${c - 1},${c},${c + 1},${c + 2},...${total}`);
            pageNumber.push(1,2,'...',c-2,c-1,c,c+1,c+2,'...',total);
        }

    }
    return pageNumber;

}
export {pagination};