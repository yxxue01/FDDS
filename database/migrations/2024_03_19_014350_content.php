<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fish_info', function (Blueprint $table) {
            $table->id();
            $table->string('familyName', 255)->unique();
            $table->string('background', 500)->nullable();
        });
        Schema::create('species', function (Blueprint $table) {
            $table->id();
            $table->string('speciesName', 255)->unique;
            $table->string('color', 500)->nullable();
            $table->string('size', 255)->nullable();
            $table->string('distribution', 500)->nullable();
            $table->string('remarks', 500)->nullable();
            $table->string('condition', 255)->default('Unknown');
            $table->foreignid('fish_info_id')->constrained('fish_info')->onUpdate('cascade');
        });
        Schema::create('dataset', function (Blueprint $table) {
            $table->id();
            $table->string('datasetTitle', 255);
            $table->string('state', 255);
        });
        Schema::create('site', function (Blueprint $table) {
            $table->id();
            $table->string('siteName', 255);
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('status', 20)->default('inprogress');
            $table->foreignId('dataset_id')->constrained('dataset')->cascadeOnDelete();
        });
        Schema::create('sample', function (Blueprint $table) {
            $table->id();
            $table->string("refno", 20);
            $table->string("samplingid", 20);
            $table->string("identifiedBy", 255)->nullable();
            $table->date("identifiedDate")->nullable();
            $table->date('datecollected');
            $table->string('commonname', 255)->nullable();
            $table->string('collectorname', 255);
            $table->string('collectmethod', 255);
            $table->time('time');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->decimal('depth', 5, 2)->nullable();
            $table->double('weight')->nullable();
            $table->double('standardL')->nullable();
            $table->double('forkL')->nullable();
            $table->double('totalL')->nullable();
            $table->string('photo', 255)->nullable();
            $table->boolean('hidden')->default(true);
            $table->string('type', 255)->nullable();
            $table->foreignid('species_id')->constrained('species')->onUpdate('cascade');
            $table->foreignId('site_id')->constrained('site')->cascadeOnDelete();
            $table->string("status", 20)->default('notassigned'); //notassigned,inprocess,accepted,rejected
        });
        Schema::create('privilege', function (Blueprint $table) {
            $table->id();
            $table->string('description', 30);
        });
        Schema::create('dataset_access', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('user')->cascadeOnDelete();
            $table->foreignId('dataset_id')->constrained('dataset')->cascadeOnDelete();
            $table->foreignId('privilege_id')->constrained('privilege')->cascadeOnDelete();
            $table->primary(['user_id', 'dataset_id']);
        });
        Schema::create('editor_task', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('user')->cascadeOnDelete();
            $table->foreignId('sample_id')->constrained('sample')->cascadeOnDelete();
        });
        Schema::create('editor', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('user')->cascadeOnDelete();
            $table->foreignid('fish_info_id')->constrained('fish_info')->onUpdate('cascade');
            $table->timestamps();
            $table->primary(['user_id', 'fish_info_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('editor_task');
        Schema::dropIfExists('editor');
        Schema::dropIfExists('sample');
        Schema::dropIfExists('site');
        Schema::dropIfExists('species');
        Schema::dropIfExists('fish_info');
        Schema::dropIfExists('dataset_access');
        Schema::dropIfExists('dataset');
        Schema::dropIfExists('privilege');

    }
};
