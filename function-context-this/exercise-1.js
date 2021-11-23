/**
 * @param {string} firstName
 * @param {string} lastName
 */
function NamedOne(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const fullNameRegex = /^\w+ \w+$/g;
/**
 * @param {string} fullName
 */
function validateFullName(fullName) {
  if (typeof fullName !== 'string') return;

  return fullNameRegex.test(fullName.trim()) && fullName;
}

Object.defineProperty(NamedOne.prototype, 'fullName', {
  get: function () {
    return `${this.firstName} ${this.lastName}`;
  },
  set: function (fullName) {
    if (validateFullName(fullName)) {
      const nameParts = fullName.split(' ');
      this.firstName = nameParts[0];
      this.lastName = nameParts[1];
      this.fullName = fullName;
    }
  },
});

module.exports = NamedOne;
