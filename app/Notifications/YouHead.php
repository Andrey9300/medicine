<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class YouHead extends Notification
{
    use Queueable;

    protected $organization_name;

    /**
     * YouHead constructor.
     *
     * @param $organization_name
     */
    public function __construct($organization_name)
    {
        $this->organization_name = $organization_name;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Добавление организации в сервисе медицинских книжек')
            ->greeting('Здравствуйте!')
            ->line('Вас назначили менеджером объекта ' . $this->organization_name . ' в сервисе медицинских книжек')
            ->action('Войти', url(env('APP_URL') . '/#/login'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
