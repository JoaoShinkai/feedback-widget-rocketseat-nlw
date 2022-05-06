import { SubmitFeedbackService } from './submitFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('Should be able to submit a feedback', async() => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example Comment',
            screenshot: 'data:image/png;base64,teste.jpg'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('Should not be able to submit feedback without type', async() => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example Comment',
            screenshot: 'data:image/png;base64,teste.jpg'
        })).rejects.toThrow();
    })

    it('Should not be able to submit feedback without comment', async() => {
        await expect(submitFeedback.execute({
            type: 'IDEA',
            comment: '',
            screenshot: 'data:image/png;base64,teste.jpg'
        })).rejects.toThrow();
    })

    it('Should not be able to submit feedback with an invalid screenshot', async() => {
        await expect(submitFeedback.execute({
            type: 'IDEA',
            comment: 'Example comment',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    })
})