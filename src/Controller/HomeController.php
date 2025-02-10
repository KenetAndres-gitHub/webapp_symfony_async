<?php

namespace App\Controller;

use App\Entity\Persona;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('/home/persons', name: 'app_home_persons')]
    public function showPersons(EntityManagerInterface $em): JsonResponse
    {
        $personsDb = $em->getRepository(Persona::class)->findAll();
        $persons = [];
        foreach ($personsDb as $person) {
            $persons[] = [
                'id' => $person->getId(),
                'name' => $person->getName(),
                'lastName' => $person->getLastName(),
                'dateBirth' => $person->getDateBirth()->format('d-m-Y'),
            ];
        }
        return $this->json($persons);
    }

    #[Route('/home/persons/add', name: 'app_home_persons_post', methods: ['POST'])]
    public function createPerson(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $name = $request->get('name');
        $lastName = $request->get('lastName');
        $dateBirth = $request->get('dateBirth');


        $person = new Persona();
        $person->setName($name);
        $person->setLastName($lastName);
        $person->setDateBirth(new \DateTime($dateBirth));

        $em->persist($person);
        $em->flush();

        return $this->json(['status'=>'success','message' => 'Person created successfully'], Response::HTTP_CREATED);
    }
}
