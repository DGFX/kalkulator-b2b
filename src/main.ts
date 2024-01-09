/**
 * Kalkulator do obliczania pensji B2B. Wynik pomniejszony o podatek dochodowy oraz składkę zdrowotną jest równy kwocie na ręke.
 * N - Kwota na ręke
 * C - Koszty w miesiącu
 * S - Procent podatku. (9% - Składka zdrowotna. 12% - Podatek PIT)
 * X - Kwota do wystawienia na fakturze
 */

interface ICalc {
  (N: number, C: number): number;
}

// Składka zdrowotna 9% od dochodu
const calcHealth: ICalc = (N, C) => {
  const S = 0.09;
  let X = ((N - C * S) / (1 - S));
  return Math.ceil(X);
}

// Podatek dochodowy 12% oraz 32% od dochodu
const calcPIT: ICalc = (N, C) => {
  const S = 0.12;
  let X = ((N - C * S) / (1 - S));
  return Math.ceil(X);
}

function init(): void {
  const btn = document.querySelector('button');
  const netto = document.querySelector<HTMLInputElement>('#netto');
  const cost = document.querySelector<HTMLInputElement>('#costs');
  const out = document.querySelector<HTMLElement>('#final-amount');
  const isHealthInput = document.querySelector<HTMLInputElement>('#health-care-check');
  const isPITInput = document.querySelector<HTMLInputElement>('#pit-check');

  function submit(): void {
    if (!netto || !cost || !out || !isHealthInput || !isPITInput) return
    const N = netto.value;
    const C = cost.value;

    const calculations = [
      { isChecked: isHealthInput.checked, calcFunction: calcHealth },
      { isChecked: isPITInput.checked, calcFunction: calcPIT }
    ];

    const result = calculations.reduce((acc, curr) => {
      if (curr.isChecked) {
        return acc + curr.calcFunction(N, C);
      }
      return acc;
    }, 0);

    out.innerHTML = `Kwota powiększona o składkę zdrowotną: ${result} <br> Kwota powiększona o składke zdrowotną oraz zwrot kosztów: ${result}`;
  }
    
  if (!btn) return;
  btn.onclick = event => {
    event.preventDefault();
    submit();
  };
}

init();
