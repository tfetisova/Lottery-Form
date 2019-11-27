let participants = [];

const regForm = document.querySelector('.reg-form');

const btnEditCreate = (id) => (`<button class="btn-edit" data-user=${id}><svg class="edit-icon" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                    <g id="edit"><g><circle cx="256" cy="256" r="253.44" fill="#ff6700"/><g><path d="M209.128,350.737l-47.865-47.865l156.964-156.964c6.966-6.966,18.261-6.966,25.227,0     l22.637,22.637c6.966,6.966,6.966,18.261,0,25.227L209.128,350.737z" style="fill:#FFFFFF;"/>\n                        <polygon points="140.684,371.316 161.263,302.872 209.128,350.737    " style="fill:#FFFFFF;"/></g></g></g><g id="edit-icon"/></svg></button>`);

//create participant row in the table func
const createParticipantRow = (user, formFields) => {
  const participantHtml = `<tr class="participants-row" data-user='${user.email}'">
                <td class="user-data user-name">${user.name}</td>
                <td class="user-data user-surname">${user.surname}</td>
                <td class="user-data user-email">${user.email}</td>
                <td class="user-data user-phone">${user.phone}</td>
                <td class="user-data edit">${btnEditCreate(user.email)}</td>
            </tr>`;
  document.querySelector('.participants-head').insertAdjacentHTML("afterend", participantHtml);
  const btnEdit = document.querySelector('.btn-edit');
  btnEdit.addEventListener('click', function (e) {
    const targetParticipant = e.target.closest('.btn-edit');
    editUser(user, targetParticipant, formFields)
  });
}
//remove participant row in the table
const removeRow = (user) => {
  const participantRow = document.querySelector(`.participants-row[data-user="${user.email}"]`);
  participantRow.remove();
}

//edit user func
const editUser = (user, targetParticipant, formFields) => {
  let editedUserIndex = participants.findIndex((el) => {
    const dataUser = targetParticipant.dataset.user;
    return el.email === dataUser;
  });
  user = participants[editedUserIndex];
  formFields.forEach((field) => {
    const fieldType = field.getAttribute('name');
    field.value = user[fieldType];
  });
}
// form submit func
regForm.addEventListener('submit', function (e){
  const regFormFields = document.querySelectorAll('.reg-form .form-field > input');
    e.preventDefault();
  let user = {};
  regFormFields.forEach((el)=>{
    const key = el.getAttribute('name');
    user[key] = el.value;
  });

  //check if user is new or existed
  const checkUser = participants.findIndex(el=> el.email === user.email);

  if (checkUser < 0) {
    createParticipantRow(user, regFormFields);
    participants.push(user);
  } else {
    participants[checkUser] = user;
    removeRow(user);
    createParticipantRow(user, regFormFields)
  }
  this.reset();
});

//choose winner
const winnerBtn = document.querySelector('.winner-btn');
const selectWinner = (participants) => {
  if (participants.length) {
    const winnerNum = Math.floor(Math.random() * participants.length);
    document.querySelector('.winners-placeholder').textContent = `${participants[winnerNum].name}, ${participants[winnerNum].surname}`;
  }
};

winnerBtn.addEventListener('click', (e)=>{
  selectWinner(participants);
});


