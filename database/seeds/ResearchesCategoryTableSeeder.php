<?php

use Illuminate\Database\Seeder;

class ResearchesCategoryTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('research_categories')->insert([
            'id' => 1,
            'category_id' => 1,
            'research_id' => 1,
        ]);
        DB::table('research_categories')->insert([
            'id' => 2,
            'category_id' => 1,
            'research_id' => 2,
        ]);
        DB::table('research_categories')->insert([
            'id' => 3,
            'category_id' => 1,
            'research_id' => 3,
        ]);
        DB::table('research_categories')->insert([
            'id' => 4,
            'category_id' => 1,
            'research_id' => 4,
        ]);
        DB::table('research_categories')->insert([
            'id' => 5,
            'category_id' => 1,
            'research_id' => 5,
        ]);
        DB::table('research_categories')->insert([
            'id' => 6,
            'category_id' => 1,
            'research_id' => 6,
        ]);
        DB::table('research_categories')->insert([
            'id' => 49,
            'category_id' => 1,
            'research_id' => 22,
        ]);
        DB::table('research_categories')->insert([
            'id' => 50,
            'category_id' => 1,
            'research_id' => 21,
        ]);
        DB::table('research_categories')->insert([
            'id' => 51,
            'category_id' => 1,
            'research_id' => 9,
        ]);
        DB::table('research_categories')->insert([
            'id' => 52,
            'category_id' => 1,
            'research_id' => 10,
        ]);
        
        DB::table('research_categories')->insert([
            'id' => 14,
            'category_id' => 2,
            'research_id' => 1,
        ]);
        DB::table('research_categories')->insert([
            'id' => 15,
            'category_id' => 2,
            'research_id' => 2,
        ]);
        DB::table('research_categories')->insert([
            'id' => 16,
            'category_id' => 2,
            'research_id' => 3,
        ]);
        DB::table('research_categories')->insert([
            'id' => 17,
            'category_id' => 2,
            'research_id' => 4,
        ]);
        DB::table('research_categories')->insert([
            'id' => 18,
            'category_id' => 2,
            'research_id' => 5,
        ]);
        DB::table('research_categories')->insert([
            'id' => 19,
            'category_id' => 2,
            'research_id' => 6,
        ]);
        DB::table('research_categories')->insert([
            'id' => 21,
            'category_id' => 2,
            'research_id' => 8,
        ]);
        DB::table('research_categories')->insert([
            'id' => 22,
            'category_id' => 2,
            'research_id' => 9,
        ]);
        DB::table('research_categories')->insert([
            'id' => 23,
            'category_id' => 2,
            'research_id' => 10,
        ]);
        DB::table('research_categories')->insert([
            'id' => 24,
            'category_id' => 2,
            'research_id' => 11,
        ]);
        DB::table('research_categories')->insert([
            'id' => 53,
            'category_id' => 2,
            'research_id' => 22,
        ]);

        DB::table('research_categories')->insert([
            'id' => 32,
            'category_id' => 3,
            'research_id' => 1,
        ]);
        DB::table('research_categories')->insert([
            'id' => 33,
            'category_id' => 3,
            'research_id' => 2,
        ]);
        DB::table('research_categories')->insert([
            'id' => 34,
            'category_id' => 3,
            'research_id' => 3,
        ]);
        DB::table('research_categories')->insert([
            'id' => 35,
            'category_id' => 3,
            'research_id' => 4,
        ]);
        DB::table('research_categories')->insert([
            'id' => 36,
            'category_id' => 3,
            'research_id' => 5,
        ]);
        DB::table('research_categories')->insert([
            'id' => 37,
            'category_id' => 3,
            'research_id' => 6,
        ]);
        DB::table('research_categories')->insert([
            'id' => 39,
            'category_id' => 3,
            'research_id' => 8,
        ]);
        DB::table('research_categories')->insert([
            'id' => 40,
            'category_id' => 3,
            'research_id' => 9,
        ]);
        DB::table('research_categories')->insert([
            'id' => 41,
            'category_id' => 3,
            'research_id' => 10,
        ]);
        DB::table('research_categories')->insert([
            'id' => 54,
            'category_id' => 3,
            'research_id' => 22,
        ]);
        DB::table('research_categories')->insert([
            'id' => 55,
            'category_id' => 3,
            'research_id' => 21,
        ]);

        // гигиеническое обучение и аттестация
        DB::table('research_categories')->insert([
            'id' => 56,
            'category_id' => 2,
            'research_id' => 17,
        ]);
        DB::table('research_categories')->insert([
            'id' => 57,
            'category_id' => 2,
            'research_id' => 23,
        ]);
        DB::table('research_categories')->insert([
            'id' => 58,
            'category_id' => 3,
            'research_id' => 17,
        ]);
        DB::table('research_categories')->insert([
            'id' => 59,
            'category_id' => 3,
            'research_id' => 23,
        ]);
        DB::table('research_categories')->insert([
            'id' => 60,
            'category_id' => 1,
            'research_id' => 17,
        ]);

        // корь
        DB::table('research_categories')->insert([
            'id' => 61,
            'category_id' => 1,
            'research_id' => 15,
        ]);
        DB::table('research_categories')->insert([
            'id' => 62,
            'category_id' => 2,
            'research_id' => 15,
        ]);
        DB::table('research_categories')->insert([
            'id' => 63,
            'category_id' => 3,
            'research_id' => 15,
        ]);

        // дифтерия
        DB::table('research_categories')->insert([
            'id' => 64,
            'category_id' => 1,
            'research_id' => 16,
        ]);
        DB::table('research_categories')->insert([
            'id' => 65,
            'category_id' => 2,
            'research_id' => 16,
        ]);
        DB::table('research_categories')->insert([
            'id' => 66,
            'category_id' => 3,
            'research_id' => 16,
        ]);

        // зонне
        DB::table('research_categories')->insert([
            'id' => 67,
            'category_id' => 1,
            'research_id' => 13,
        ]);
        DB::table('research_categories')->insert([
            'id' => 68,
            'category_id' => 2,
            'research_id' => 13,
        ]);
        DB::table('research_categories')->insert([
            'id' => 69,
            'category_id' => 3,
            'research_id' => 13,
        ]);

        // гепатит 1
        DB::table('research_categories')->insert([
            'id' => 70,
            'category_id' => 1,
            'research_id' => 14,
        ]);
        DB::table('research_categories')->insert([
            'id' => 71,
            'category_id' => 2,
            'research_id' => 14,
        ]);
        DB::table('research_categories')->insert([
            'id' => 72,
            'category_id' => 3,
            'research_id' => 14,
        ]);

        // гепатит 2
        DB::table('research_categories')->insert([
            'id' => 73,
            'category_id' => 1,
            'research_id' => 20,
        ]);
        DB::table('research_categories')->insert([
            'id' => 74,
            'category_id' => 2,
            'research_id' => 20,
        ]);
        DB::table('research_categories')->insert([
            'id' => 75,
            'category_id' => 3,
            'research_id' => 20,
        ]);
    }
}
