<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Region;

class RegionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
                    Region::insert([
                                    [
                                       'title' => 'Arica y Parinacota'    
                                    ],
                                    [
                                        'title' => 'Tarapacá'  
                                    ],
                                    [
                                        'title' => 'Antofagasta'  
                                    ],
                                    [
                                        'title' => 'Atacama'  
                                    ],
                                    [
                                        'title' => 'Coquimbo'  
                                    ],
                                    [
                                        'title' => 'Valparaíso'  
                                    ],
                                    [
                                        'title' => 'Libertador Gral Bernardo Ohiggins'  
                                    ],
                                    [
                                        'title' => 'Maule'  
                                    ],
                                    [
                                        'title' => 'BioBío'  
                                    ],
                                    [
                                        'title' => 'La Araucanía'  
                                    ],
                                    [
                                        'title' => 'Los Ríos'  
                                    ],
                                    [
                                        'title' => 'Los Lagos'  
                                    ],
                                    [
                                        'title' => 'Aisén'  
                                    ],
                                    [
                                        'title' => 'Magallanes y la Antártica Chilena'  
                                    ],
                                    [
                                        'title' => 'Metropolitana de Santiago'  
                                    ]
                                    ]);

    }
}
