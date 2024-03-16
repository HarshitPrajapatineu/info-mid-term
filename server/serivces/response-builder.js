const status200OK = {
    code: 200,
    messgae: "Success",
    stackTrace: null
}

const status400BadRequest = {
    code: 400,
    messgae: "Bad Request",
    stackTrace: null
}

const status401Unauthorized = {
    code: 401,
    messgae: "Unauthorized Access!",
    stackTrace: null
}

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
        status: status200OK
    }
}

function RBDesign200OK(design) {

    // console.log('aaaaa' + design);
    return {
        data: null,
        design: design,
        status: status200OK
    }
}

function RBData401Unauthorized(data) {

    return {
        data: data,
        design: null,
        status: status401Unauthorized
    }
}

function RBDesign401Unauthorized(design) {

    // console.log('aaaaa' + design);
    return {
        data: null,
        design: design,
        status: status401Unauthorized
    }
}

module.exports = {
    RB: RB,
    RBData200OK: RBData200OK,
    RBDesign200OK: RBDesign200OK,
    RBData401Unauthorized: RBData401Unauthorized,
    RBDesign401Unauthorized: RBDesign401Unauthorized
};