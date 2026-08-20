package com.hospital.smarthospital.service;

import com.hospital.smarthospital.model.Doctor;
import com.hospital.smarthospital.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Doctor doctor = getDoctorById(id);
        doctor.setFullName(updatedDoctor.getFullName());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setPhoneNumber(updatedDoctor.getPhoneNumber());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setExperienceYears(updatedDoctor.getExperienceYears());
        doctor.setDepartment(updatedDoctor.getDepartment());
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
