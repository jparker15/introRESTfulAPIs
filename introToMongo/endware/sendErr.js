module.exports = (req,res) =>{

  const {error:err} = req.error;

  const errMsg = err.message||err;
  const errStat = err.status|| 500;

  res.status(errStat).json({error:errMsg});
}