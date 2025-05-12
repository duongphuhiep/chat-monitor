
export function validateUsername(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
	  return `Invalid email format`;
	}
  }
  
 export function validatePassword(password: string) {
	if (typeof password !== 'string' || password.length < 6) {
	  return `Passwords must be at least 6 characters long`;
	}
  }