<?php

use App\Actions\Team\CreateTeam;
use App\Models\Team;
use App\Models\User;
use Illuminate\Validation\ValidationException;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->createTeamAction = new CreateTeam;
});

it('creates a team successfully', function () {
    $data = ['name' => 'Test Team'];

    $team = $this->createTeamAction->handle($this->user, $data);

    expect($team)->toBeInstanceOf(Team::class)
        ->and($team->name)->toBe('Test Team')
        ->and($team->personal_team)->toBeFalse()
        ->and($team->user_id)->toBe($this->user->id)
        ->and($team->members)->toHaveCount(1)
        ->and($team->members->first()->id)->toBe($this->user->id)
        ->and($team->members->first()->pivot->role)->toBe('Owner');
});

it('validates that name is required', function () {
    $data = [];

    expect(fn () => $this->createTeamAction->handle($this->user, $data))
        ->toThrow(ValidationException::class, 'The name field is required.');
});

it('validates that name is a string', function () {
    $data = ['name' => 123];

    expect(fn () => $this->createTeamAction->handle($this->user, $data))
        ->toThrow(ValidationException::class, 'The name field must be a string.');
});

it('validates that name has maximum 255 characters', function () {
    $data = ['name' => str_repeat('a', 256)];

    expect(fn () => $this->createTeamAction->handle($this->user, $data))
        ->toThrow(ValidationException::class, 'The name field must not be greater than 255 characters.');
});

it('creates team with empty string name', function () {
    $data = ['name' => ''];

    expect(fn () => $this->createTeamAction->handle($this->user, $data))
        ->toThrow(ValidationException::class, 'The name field is required.');
});

it('creates team with whitespace only name', function () {
    $data = ['name' => '   '];

    expect(fn () => $this->createTeamAction->handle($this->user, $data))
        ->toThrow(ValidationException::class, 'The name field is required.');
});

it('creates team with special characters in name', function () {
    $data = ['name' => 'Team @#$%^&*()'];

    $team = $this->createTeamAction->handle($this->user, $data);

    expect($team->name)->toBe('Team @#$%^&*()');
});

it('creates team with unicode characters in name', function () {
    $data = ['name' => 'Equipo Español ñáéíóú'];

    $team = $this->createTeamAction->handle($this->user, $data);

    expect($team->name)->toBe('Equipo Español ñáéíóú');
});

it('creates team with exactly 255 characters', function () {
    $data = ['name' => str_repeat('a', 255)];

    $team = $this->createTeamAction->handle($this->user, $data);

    expect($team->name)->toBe(str_repeat('a', 255));
});

it('assigns user as owner with correct pivot data', function () {
    $data = ['name' => 'Owner Team'];

    $team = $this->createTeamAction->handle($this->user, $data);

    $pivot = $team->members->first()->pivot;
    expect($pivot->role)->toBe('Owner')
        ->and($pivot->user_id)->toBe($this->user->id)
        ->and($pivot->team_id)->toBe($team->id);
});

it('creates team with personal_team set to false', function () {
    $data = ['name' => 'Non Personal Team'];

    $team = $this->createTeamAction->handle($this->user, $data);

    expect($team->personal_team)->toBeFalse()
        ->and($team->isPersonalTeam())->toBeFalse();
});
