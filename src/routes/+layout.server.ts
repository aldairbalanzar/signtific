export const load = async ({ locals }) => {
	const { session, user } = locals;

	return {
		session,
		user
	};
};
