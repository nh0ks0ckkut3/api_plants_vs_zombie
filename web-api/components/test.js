const tinhtoan = (a,b,tenPhepToan) => {
  soA = Number(a);
  soB = Number(b);
  const cong = soA + soB;
  const tru = soA - soB;
  const nhan = soA * soB;
  const chia = soA / soB;
  let ketqua;
  switch (tenPhepToan) {
    case "cong":
      // res.json({ ketqua: cong });
      ketqua = cong;
      break;
    case "tru":
      // res.json({ ketqua: tru });
      ketqua = tru;
      break;
    case "nhan":
      // res.json({ ketqua: nhan });
      ketqua = nhan;
      break;
    case "chia":
      // res.json({ ketqua: chia });
      ketqua = chia;
      break;
    default:
      break;
  }
  return ketqua;
}

module.exports = {tinhtoan};