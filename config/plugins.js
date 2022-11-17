module.exports = ({ env }) => ({
    email: {
    config: {
        provider: 'sendgrid',
        providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
        defaultFrom: 'soporte@arpitools.com',
        defaultReplyTo: 'soporte@arpitools.com',
        },
    },
    },
});