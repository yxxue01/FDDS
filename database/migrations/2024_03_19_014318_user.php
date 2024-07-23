<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->string('name',255);
            $table->string('orcid',255)->nullable();
            $table->string('organization',65)->nullable();
            $table->string('field',65)->nullable();
            $table->string('phoneno',20)->nullable();
        });
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string('email',65)->unique();
            $table->string('password',255);
            $table->boolean('isActive')->default(false);
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
            $table->foreignId('profile_id')->constrained('profile')->cascadeOnUpdate()->cascadeOnDelete();
        });
        Schema::create('unverified_user', function (Blueprint $table) {
            $table->id();
            $table->string('email',65)->unique();
            $table->string('password',255);
            $table->string('token',255);
            $table->string('role',100);
            $table->boolean('isActive')->default(false);
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
            $table->foreignId('profile_id')->constrained('profile');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
        Schema::dropIfExists('unverified_user');
        Schema::dropIfExists('profile');
    }
};
