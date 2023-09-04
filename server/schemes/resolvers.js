const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return user.findOne({ username }).populate('savedBooks');
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { profileId, bookData }) => {
            return User.findOneAndUpdate(
                { _id: profileId },
                {
                    $addToSet: { savedBooks: bookData },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        deleteBook: async (parent, { profileId, bookId }) => {
            return User.findOneAndUpdate(
                { _id: profileId },
                {pull: { savedBooks: bookId } },
                {new: true}
            )
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        }
    }
}

module.exports = resolvers;