<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class SendPassword extends Notification
{
    use Queueable;

    protected $email;
    protected $password;
    protected $organization_name;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($email, $password, $organization_name)
    {
        $this->email = $email;
        $this->password = $password;
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
            ->subject('Доступ к сервису медицинских книжек')
            ->greeting('Здравствуйте!')
            ->line('Вас назначили руководителем объекта ' . $this->organization_name . ' в сервисе медицинских книжек')
            ->line('Логин для входа: ' . $this->email)
            ->line('Пароль для входа: ' . $this->password)
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
