<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/home/json', name: 'app_home_json')]
    public function prueba(): JsonResponse
    {
        $data = [
            'message' => 'Hello, this is a JSON response',
            'controller_name' => 'HomeController',
        ];

        return $this->json($data);
    }
}
