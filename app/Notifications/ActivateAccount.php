<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ActivateAccount extends Notification
{
    use Queueable;

    private $newUser;

    /**
     * ActivateAccount constructor.
     *
     * @param $newUser
     */
    public function __construct($newUser)
    {
        $this->newUser = $newUser;
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
        $activationLink = route('activation', ['id' => $this->newUser->id, 'token' => md5($this->newUser->email)]);

        return (new MailMessage)
            ->subject('Активация аккаунта сервиса медицинских книжек')
            ->greeting('Здравствуйте!')
            ->line('Вы получили это письмо, чтобы активировать Вашу учетную запись.')
            ->action('Активировать', $activationLink)
            ->line('Если вы не регистрировали аккаунт, то проигнорируйте это сообщение');
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
