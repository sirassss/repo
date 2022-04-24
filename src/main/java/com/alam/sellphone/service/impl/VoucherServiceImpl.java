package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.User;
import com.alam.sellphone.domain.Voucher;
import com.alam.sellphone.repository.VoucherRepository;
import com.alam.sellphone.service.UserService;
import com.alam.sellphone.service.VoucherService;
import com.alam.sellphone.web.rest.errors.BadRequestAlertException;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Voucher}.
 */
@Service
@Transactional
public class VoucherServiceImpl implements VoucherService {

    private final Logger log = LoggerFactory.getLogger(VoucherServiceImpl.class);

    private final VoucherRepository voucherRepository;

    private final UserService userService;

    public VoucherServiceImpl(VoucherRepository voucherRepository, UserService userService) {
        this.voucherRepository = voucherRepository;
        this.userService = userService;
    }

    @Override
    public Voucher save(Voucher voucher) {
        log.debug("Request to save Voucher : {}", voucher);
        return voucherRepository.save(voucher);
    }

    @Override
    public Optional<Voucher> partialUpdate(Voucher voucher) {
        log.debug("Request to partially update Voucher : {}", voucher);

        return voucherRepository
            .findById(voucher.getId())
            .map(
                existingVoucher -> {
                    if (voucher.getVoucherCode() != null) {
                        existingVoucher.setVoucherCode(voucher.getVoucherCode());
                    }
                    if (voucher.getProductID() != null) {
                        existingVoucher.setProductID(voucher.getProductID());
                    }
                    if (voucher.getPromotionRate() != null) {
                        existingVoucher.setPromotionRate(voucher.getPromotionRate());
                    }
                    if (voucher.getDateIssue() != null) {
                        existingVoucher.setDateIssue(voucher.getDateIssue());
                    }
                    if (voucher.getStatus() != null) {
                        existingVoucher.setStatus(voucher.getStatus());
                    }

                    return existingVoucher;
                }
            )
            .map(voucherRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Voucher> findAll(Pageable pageable) {
        log.debug("Request to get all Vouchers");
        Optional<User> user = userService.getUserWithAuthorities();
        if (user.isPresent()) {
            return voucherRepository.findAllNotForProduct(pageable, user.get().getId());
        }
        throw new BadRequestAlertException("", "", "");
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Voucher> findOne(Long id) {
        log.debug("Request to get Voucher : {}", id);
        return voucherRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Voucher : {}", id);
        voucherRepository.deleteById(id);
    }
}
