import { MailAdapter } from '../adapters/mailAdapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor(private feedbackRepository: FeedbacksRepository, private mailAdapter: MailAdapter){
    }

    async execute(request: SubmitFeedbackServiceRequest){
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error('Type is required.');
        }
        if(!comment){
            throw new Error('Comment is required.');
        }
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('invalid screenshot format.');
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'New Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot && `<img src=${screenshot} >`,
                `</div>`
            ].join('\n')
        })
    }
}