function RB(data, design, status) {
    return {
        data: data,
        design: design,
        status: status
    }
}

function RBData200OK(data) {

    return {
        data: data,
        design: null,
        status: null
    }
}

function RBDesign200OK(design) {
    
    console.log('aaaaa'+ design);
    return {
        data: null,
        design: design,
        status: null
    }
}

module.exports = {
    RB: RB,
    RBData200OK: RBData200OK,
    RBDesign200OK: RBDesign200OK
};