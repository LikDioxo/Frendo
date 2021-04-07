<?php


namespace App\Service;


use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    private $defaultDirectory;
    private $slugger;

    public function __construct(
        string $defaultDirectory,
        SluggerInterface $slugger
    )
    {
        $this->defaultDirectory = $defaultDirectory;
        $this->slugger = $slugger;
    }

    public function upload(
        UploadedFile $file,
        string $fileFolder
    ): string
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename);
        $fileName = "{$safeFilename}.{$file->guessExtension()}";

        try {
            $file->move("{$this->defaultDirectory}\\{$fileFolder}", $fileName);
        } catch (FileException $e) {
            // ... handle exception if something happens during file upload
        }

        return $fileName;
    }
}
