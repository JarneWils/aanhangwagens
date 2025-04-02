import { createWithEqualityFn } from "zustand/traditional";

interface FormStore {
	firstName: string;
	setFirstName: (newFirstName: string) => void;

	lastName: string;
	setLastName: (newLastName: string) => void;

	phoneNumber: string;
	setPhoneNumber: (newPhoneNumber: string) => void;

	eMail: string;
	setEMail: (newEMail: string) => void;
}

const useFormStore = createWithEqualityFn<FormStore>((set) => ({
	firstName: "",
	setFirstName: (newFirstName) => set({ firstName: newFirstName }),

	lastName: "",
	setLastName: (newLastName) => set({ lastName: newLastName }),

	phoneNumber: "",
	setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),

	eMail: "",
	setEMail: (newEMail) => set({ eMail: newEMail }),
}));

export default useFormStore;
