package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.Bank;
import com.alam.sellphone.repository.BankRepository;
import com.alam.sellphone.service.BankService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Bank}.
 */
@Service
@Transactional
public class BankServiceImpl implements BankService {

    private final Logger log = LoggerFactory.getLogger(BankServiceImpl.class);

    private final BankRepository bankRepository;

    public BankServiceImpl(BankRepository bankRepository) {
        this.bankRepository = bankRepository;
    }

    @Override
    public Bank save(Bank bank) {
        log.debug("Request to save Bank : {}", bank);
        return bankRepository.save(bank);
    }

    @Override
    public Optional<Bank> partialUpdate(Bank bank) {
        log.debug("Request to partially update Bank : {}", bank);

        return bankRepository
            .findById(bank.getId())
            .map(
                existingBank -> {
                    if (bank.getAccountName() != null) {
                        existingBank.setAccountName(bank.getAccountName());
                    }
                    if (bank.getBankName() != null) {
                        existingBank.setBankName(bank.getBankName());
                    }
                    if (bank.getAccountNumber() != null) {
                        existingBank.setAccountNumber(bank.getAccountNumber());
                    }
                    if (bank.getBranch() != null) {
                        existingBank.setBranch(bank.getBranch());
                    }
                    if (bank.getStatus() != null) {
                        existingBank.setStatus(bank.getStatus());
                    }

                    return existingBank;
                }
            )
            .map(bankRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Bank> findAll(Pageable pageable) {
        log.debug("Request to get all Banks");
        return bankRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Bank> findOne(Long id) {
        log.debug("Request to get Bank : {}", id);
        return bankRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bank : {}", id);
        bankRepository.deleteById(id);
    }
}
