'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2022-02-09T11:42:26.371Z',
    '2022-02-10T07:43:59.331Z',
    '2022-02-11T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'CAD',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerAppOpacity = document.querySelector('.app__opacity');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const formatTransDate = function(date, locale){
  const getDaysBetween2Dates = (data1 , data2) => Math.round(Math.abs((data2 - data1) / (1000 * 60 * 60 * 24)));
  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if(daysPassed === 0)return 'Today';
  if(daysPassed === 1)return 'Tommorow';
  if(daysPassed <= 7 )return  `${daysPassed} days ago`;
  else{
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() +1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(date);
  }
};


const formatCurrency = function(value , locale,currency){
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);
}

const displayTransactions = function(account, sort = false){
  containerTransactions.innerHTML = '';

  const transacts = sort ? account.transactions.slice().sort((x,y) => x-y) : account.transactions;

  transacts.forEach(function(trans, index){
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransDate(date, account.locale);

    const formatTrans = formatCurrency(trans,account.locale, account.currency);
    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${index+1} ${transType}
      </div>
      <div class="transactions__date">${transDate}</div>
      <div class="transactions__value">${formatTrans}</div>
    </div>
    `;
    containerTransactions.insertAdjacentHTML('afterbegin',transactionRow);
  });
};

  

const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLocaleLowerCase()
      .split(' ')
      .map(item => item[0])
      .join('');
    
  });
};
createNicknames(accounts);



const displayBalance = function(account){
  const balance = account.transactions.reduce((acc,trans) => acc + trans,0);
  account.balance = balance;

  const formatBalans = formatCurrency(balance,account.locale, account.currency);
  
  labelBalance.textContent = `${formatBalans}`;
};



const displayTotal = function(account){
  const deposit = account.transactions.filter(trans => trans > 0 ).reduce((acc,item) => acc + item, 0);
  labelSumIn.textContent = formatCurrency(deposit,account.locale, account.currency);
  
  const withdrawal = Math.abs(account.transactions.filter(trans => trans < 0 ).reduce((acc,item) => acc + item, 0));
  labelSumOut.textContent = formatCurrency(withdrawal,account.locale, account.currency);

  const interest = account.transactions
    .filter(trans => trans > 0 )
    .map(trans => trans * account.interest / 100)
    .filter(deposProcent => deposProcent > 5 )
    .reduce((acc,item) => acc + item, 0).toFixed(2)
  labelSumInterest.textContent = formatCurrency(interest,account.locale, account.currency);
};


const updateUi = function(account){
  // Display Transactions
  displayTransactions(account)
    
  // Display Balance
  displayBalance (account);
  
  // Display Total
  displayTotal(account);
}

let currentAccount, currentLogoutTimer ;




const startLogoutTimer = function(){
  let time = 300;

  const logoutTimerCallback = function(){
    let minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    let seconds = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${minutes}:${seconds}`;

    if( time === 0){
      clearInterval(logoutTimer)
      containerApp.style.display ='none';
      labelWelcome.textContent = 'Войдите в свой аккаунт'
    }
    time--;
  };
  logoutTimerCallback();
  const logoutTimer = setInterval(logoutTimerCallback, 1000)

  return logoutTimer;
}

// Обработчики событий
btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currentAccount = accounts.find(account => account.nickname === inputLoginUsername.value)
  if(currentAccount?.pin === +inputLoginPin.value){
    labelWelcome.textContent = `Рады что вы снова с нами ${currentAccount.userName.split(' ')[0]}!`;
    containerApp.style.display ='grid';
    containerAppOpacity.style.opacity = '1'

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', 
      year: 'numeric',
      weekday: 'long', 
    }

    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() +1}`.padStart(2, '0');
    // const year = now.getFullYear();

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

    
    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    if (currentLogoutTimer) clearInterval(currentLogoutTimer)
    currentLogoutTimer = startLogoutTimer()
    updateUi(currentAccount)
  }
  
})


btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(account => account.nickname === recipientNickname);
  
  inputTransferTo.value ='';
  inputTransferAmount.value ='';

  if (
    transferAmount > 0 && 
    currentAccount.balance >= transferAmount && 
    recipientAccount &&
    currentAccount.nickname !== recipientAccount?.nickname 
    ){

    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    currentAccount.transactionsDates.push(new Date().toISOString())
    recipientAccount.transactionsDates.push(new Date().toISOString())
    updateUi(currentAccount)
      
    clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer();
  }
})


btnClose.addEventListener('click', function(e){
  e.preventDefault();
  const userName = inputCloseUsername.value;
  const userPin = +inputClosePin.value;
  if( userName === currentAccount.nickname && userPin === currentAccount.pin){
    const currentAccountIndex = accounts.findIndex(account => account.nickname === currentAccount.nickname)

    accounts.splice(currentAccountIndex,1)  
    containerApp.style.display = 'none'
    labelWelcome.textContent = 'Войдите в свой аккаунт'
  }
})


btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const loanAmount = +Math.floor(inputLoanAmount.value);
  if (loanAmount > 0 && currentAccount.transactions.some(trans => trans >= loanAmount * 10/100)){
    setTimeout(()=>{
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString())
      updateUi(currentAccount)

      
    },5000)
    
  }
  inputLoanAmount.value = '';

  clearInterval(currentLogoutTimer);
  currentLogoutTimer = startLogoutTimer();
})


let  sorted = false
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayTransactions(currentAccount, !sorted)
  sorted = !sorted
})

const logoImage = document.querySelector('.logo');
logoImage.addEventListener('click', function(){
  [...document.querySelectorAll('.transactions__row')]
    .forEach(function(row, i){
      if( i % 2 === 0){
        row.style.backgroundColor = 'grey';
      }
    })
})










// let arr1 = [7 , 3, 2, 4, 1, 15, 8, 1, 9, 2];
// let arr2 = [1, 16, 12, 4, 5, 1, 3, 11, 7, 2];


// const getAverengeHumanAge = arr => {
//   let averageAge =  arr
//     .map(item => item <= 2 ? item * 10 : item * 7)
//     .filter(item  => item > 18)
//     .reduce((acc,item, index, arr) => acc + item/arr.length, 0);
//   return averageAge;
  
// }
// const humanAverege1 = getAverengeHumanAge(arr1);
// const humanAverege2 = getAverengeHumanAge(arr2);

// console.log(humanAverege1,humanAverege2);



// const cats = [
//   { catWeight: 3, foodWeight: 25, owners: ['Наташа'] },
//   { catWeight: 6, foodWeight: 90, owners: ['Марина', 'Алиса'] },
//   { catWeight: 4, foodWeight: 45, owners: ['Алекс', 'Ирина'] },
//   { catWeight: 7, foodWeight: 80, owners: ['Борис'] },
//  ];
 
//  cats.forEach(function(cat){
//   cat.recommendedPortion = cat.catWeight * 0.75 * 12
// })

// console.log(cats);


// const alexCat = cats.find(cat => cat.owners.includes('Алекс'));
// console.log(`Эта кошка ест слишком ${alexCat.foodWeight > alexCat.recommendedPortion ? 'много' : 'мало'}`);


// const catsEatTooMuchOwners = cats
//   .filter(cat => cat.foodWeight > cat.recommendedPortion )
//   .flatMap(cat => cat.owners);
// console.log(catsEatTooMuchOwners);

// const catsEatTooLittleOwners = cats
//   .filter(cat => cat.foodWeight < cat.recommendedPortion )
//   .flatMap(cat => cat.owners);
// console.log(catsEatTooLittleOwners);


// // "Марина, Алиса, Борис - хозяева кошек, которые едят слишком много!" 
// // "Наташа, Ирина, Алекс  - хозяева кошек, которые едят слишком мало!"
//  console.log(`${catsEatTooMuchOwners.join(', ')} - хозяева кошек, которые едят слишком много!`);
//  console.log(`${catsEatTooLittleOwners.join(', ')} - хозяева кошек, которые едят слишком много!`);
 

//  console.log(cats.some(cat => cat.foodWeight === cat.recommendedPortion));


//  const isFoodWeightNormal = cat => 
//   cat.foodWeight > cat.recommendedPortion * 0.9 && 
//   cat.foodWeight < cat.recommendedPortion * 1.1

//   console.log(cats.some(isFoodWeightNormal));

// console.log(cats.filter(isFoodWeightNormal));


// const cats1 =cats.slice().sort((x, y) => x.recommendedPortion - y.recommendedPortion);

// console.log(cats1);
