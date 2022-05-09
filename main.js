function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
// hu, r, alpha, xd, yd, xk, yk

document.getElementById('hu') && (document.getElementById('hu').value = localStorage.getItem('hu'));
document.getElementById('xDitaket') && (document.getElementById('xDitaket').value = localStorage.getItem('xDitaket'));
document.getElementById('yDitaket') && (document.getElementById('yDitaket').value = localStorage.getItem('yDitaket'));
document.getElementById('xKrakayin') && (document.getElementById('xKrakayin').value = localStorage.getItem('xKrakayin'));
document.getElementById('yKrakayin') && (document.getElementById('yKrakayin').value = localStorage.getItem('yKrakayin'));

const clear1 = () => {
  document.getElementById('heravorutyun').value = null;
  document.getElementById('ankyun').value = null;
  document.getElementById('xNshanaket').value = null;
  document.getElementById('yNshanaket').value = null;
  document.getElementById('dalnost').value = null;
  document.getElementById('himnakanUghutyunic').value = null;
  document.getElementById('table').style.display = 'none';
}

const clearAll = () => {
  localStorage.clear();
  document.getElementById('heravorutyun').value = null;
  document.getElementById('ankyun').value = null;
  document.getElementById('hu').value = null;
  document.getElementById('xDitaket').value = null;
  document.getElementById('yDitaket').value = null;
  document.getElementById('table').style.display = 'none';
  document.getElementById('xKrakayin').value = null;
  document.getElementById('yKrakayin').value = null;
  document.getElementById('xNshanaket').value = null;
  document.getElementById('yNshanaket').value = null;
  document.getElementById('dalnost').value = null;
  document.getElementById('himnakanUghutyunic').value = null;
}

const execute1 = () => {
  const hu = Number(document.getElementById('hu').value);
  const r = Number(document.getElementById('heravorutyun').value);
  const alpha = Number(document.getElementById('ankyun').value);
  const xd = Number(document.getElementById('xDitaket').value);
  const yd = Number(document.getElementById('yDitaket').value);
  const xk = Number(document.getElementById('xKrakayin').value);
  const yk = Number(document.getElementById('yKrakayin').value);

  let fixed, qar, ax, ay;

  // if (hu >= 5250 && hu <= 6000 || hu >= 0 && hu < 750) {
  if (hu >= 0 && hu < 1500) {
    qar = 1;
    ax = 1;
    ay = 1;
    fixed = 0;
  }

  // if (hu >= 750 && hu < 2250) {
  if (hu >= 1500 && hu < 3000) {
    qar = 2;
    ax = -1;
    ay = 1;
    fixed = 1500;
  }

  // if (hu >= 2250 && hu < 3750) {
  if (hu >= 3000 && hu < 4500) {
    qar = 3;
    ax = -1;
    ay = -1;
    fixed = 3000;
  }

  // if (hu >= 3750 && hu < 5250) {
  if (hu >= 4500 && hu < 6000) {
    qar = 4;
    ax = 1;
    ay = -1;
    fixed = 4500;
  }

  const angle = alpha - fixed;
  const degreeAngle = Math.abs(angle) * 0.06;
  let horizontalAngle = 90 - degreeAngle;

  if (angle < 0) {
    horizontalAngle = 180 - horizontalAngle;
  }

  let xn, yn;

  if (qar === 1 || qar === 3) {
    xn = ax * r * Math.sin(toRadians(horizontalAngle)) + xd;
    yn = ay * r * Math.cos(toRadians(horizontalAngle)) + yd;
  }

  if (qar === 2 || qar === 4) {
    xn = ax * r * Math.cos(toRadians(horizontalAngle)) + xd;
    yn = ay * r * Math.sin(toRadians(horizontalAngle)) + yd;
  }

  const distance = Math.sqrt(Math.pow(xn - xk, 2) + Math.pow(yn - yk, 2));

  let davarot;

  if (qar === 1 || qar === 3) {
    davarot = Math.atan((ay * (yn - yk)) / (ax * (xn - xk)));
  }

  if (qar === 2 || qar === 4) {
    davarot = Math.atan((ax * (xn - xk)) / (ay * (yn - yk)));
  }

  davarot = toDegrees(davarot);

  davarot = davarot / 0.06;

  const ankyun = (Math.round((fixed + davarot) - hu) / 100).toFixed(2);


  console.log({ xn, yn, distance, ankyun })
  localStorage.setItem('hu', hu.toString());
  localStorage.setItem('xKrakayin', xk.toString());
  localStorage.setItem('yKrakayin', yk.toString());
  localStorage.setItem('xDitaket', xd.toString());
  localStorage.setItem('yDitaket', yd.toString());

  document.getElementById('xNshanaket').innerHTML = Math.round(xn);
  document.getElementById('yNshanaket').innerHTML = Math.round(yn);
  document.getElementById('dalnost').innerHTML = Math.round(distance);
  document.getElementById('himnakanUghutyunic').innerHTML = ankyun;

  document.getElementById('table').style.display = 'block';

  return { xn, yn, distance, ankyun }
}
