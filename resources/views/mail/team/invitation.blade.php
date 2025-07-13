<x-mail::message>
# You have a new team invitation

{{ $sender->name }} has invited you to join their team: **{{ $invitation->team->name }}**.
You can accept the invitation by clicking the button below:

<x-mail::button :url="$invitationUrl">
Accept Invitation
</x-mail::button>

If you did not expect this invitation, you can ignore this email.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
