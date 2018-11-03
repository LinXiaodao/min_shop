const responseContent = (type,body) =>{
  return {
    type: type,
    body:{
      code:body.code || 0,
      status:body.status || 0,
      data:body.data || {}
    }
  }
}

module.exports = responseContent;